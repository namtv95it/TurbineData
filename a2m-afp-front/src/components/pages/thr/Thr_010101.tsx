import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { HeadersUtil } from '../../../utils/headersUtil';
import { useAppDispatch, useAppNavigate } from '../../../store/hook';
import { setSelectedSideBarMenuId, setSelectedTsstMenuId } from '../../../reducers/docSideBarSlice';
import { setSelectedCommentId, resetSelectedCommentId } from '../../../reducers/threadSlice';
import { useSelector } from 'react-redux';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { ComPostService } from '../../../services/common/ComPostService';
import { Constant } from '../../../constants/constant';

type Threads0101ItemProps = {
    items: any[]
    moveToThread: any
    refreshItems: () => void
    threadsType: string
}

export default function Thr_010101(props: Threads0101ItemProps) {

    const [afpMenus, setAfpMenus] = useState([]);

    const [items, setItems] = useState(props.items);

    const [moveToThread, setMoveToThreads] = useState(props.moveToThread);

    const [tsstMenus, setTsstMenus] = useState<any>([])

    const appNavigate = useAppNavigate();

    const dispatch = useAppDispatch();

    const [comPostService] = useState<ComPostService>(new ComPostService());

    useEffect(() => {
        setItems(props.items)
        setMoveToThreads(props.moveToThread)
    }, [props.items, props.moveToThread])

    useEffect(() => {
        scrollToThread()
    }, [items, moveToThread]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [menusResponse, tsstMenusResponse] = await Promise.all([
                    axios.get(process.env.REACT_APP_API_URL + "/threads/getAfpMenus.exclude", {
                        headers: HeadersUtil.getHeadersAuth()
                    }),
                    axios.get(process.env.REACT_APP_API_URL + "/sys/sys0101/getMenuByUser.exclude", {
                        headers: HeadersUtil.getHeadersAuth()
                    })
                ]);

                if (menusResponse.data.status) {
                    setAfpMenus(menusResponse.data.responseData);
                } else {
                    toast.error("error");
                }

                if (tsstMenusResponse.data.status) {
                    setTsstMenus(tsstMenusResponse.data.responseData);
                }
            } catch (error) {
                toast.error("sys error");
            }
        };

        fetchData();
    }, []);

    const addLikeOrUnlike = (commentId: number, oldStatus: string) => {
        dispatch(showAndHideSpinner(true))
        comPostService.addLikeOrUnlike({ commentId: commentId, isLike: oldStatus })
            .then(resp => {
                if (resp.data.status) {
                    handleLike(commentId, oldStatus);
                }
                dispatch(showAndHideSpinner(false))
            })
            .catch(error => {
                dispatch(showAndHideSpinner(false))
            })
    }

    const handleLike = (commentId: number, oldStatus: string) => {
        let index = items.findIndex((item: any) => item.id === commentId);

        let arr = structuredClone(items);

        let item = arr[index];
        item.isLike = oldStatus === "Y" ? "N" : "Y";
        item.likeNumber = oldStatus === "Y" ? item.likeNumber - 1 : item.likeNumber + 1

        setItems(arr);
    }

    const bookmarkOrUnBookmark = (commentId: number, oldStatus: string) => {
        dispatch(showAndHideSpinner(true));
        comPostService
            .bookmarkOrUnBookmark({ commentId: commentId, isBookmark: oldStatus })
            .then((resp) => {
                if (resp.data.status) {
                    handleBookmark(commentId, oldStatus);
                }
                dispatch(showAndHideSpinner(false));
            })
            .catch((error) => {
                dispatch(showAndHideSpinner(false));
            });
    };

    const handleBookmark = (postId: number, oldStatus: string) => {
        if (props.threadsType == Constant.THREADS_TYPE[5]) {
            props.refreshItems()
        } else {
            let index = items.findIndex((item: any) => item.id === postId);
            let arr = structuredClone(items);
            let item = arr[index];
            item.isBookmark = oldStatus === "Y" ? "N" : "Y";
            setItems(arr);
        }

    };

    // Hàm lấy đường dẫn của tsstMenuId
    function getPathTsstMenu(tsstMenuId: any, tsstMenus: any) {
        let pathTsstMenu: any = [];

        const findMenuItem = (menuId: any, items: any) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i].tsstMenuDtos;

                if (item.some((submenu: any) => submenu.menuId === menuId)) {
                    const foundSubmenu = item.find((submenu: any) => submenu.menuId === menuId);
                    pathTsstMenu.push(foundSubmenu.menuNm);
                    return true;
                }
            }
            return false;
        };

        findMenuItem(tsstMenuId, tsstMenus);

        return pathTsstMenu;
    }

    // Hàm lấy đường dẫn (path) của một post dựa trên menuId
    function getPath(menuId: any, afpMenus: any, tsstMenus: any) {

        let path: any = [];

        const findMenuItem = (menuId: any, items: any) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                if (item.id === menuId) {
                    path.push(item.name);
                    if (item.lev === 1) {
                        path.push(getPathTsstMenu(item.tsstMenuId, tsstMenus));
                    }
                    return true;
                }
                if (item.children && findMenuItem(menuId, item.children)) {
                    path.push(item.name);
                    if (item.lev === 1) {
                        path.push(getPathTsstMenu(item.tsstMenuId, tsstMenus));
                    }
                    return true;
                }
            }
            return false;
        };

        findMenuItem(menuId, afpMenus);

        return path.reverse().join(' > ');
    }

    const handleClickLink = async (item: any) => {

        let docPostInfo: any = {};
        await comPostService.getDocumentPostInfo(item.postId).then(res => {
            docPostInfo = res.data.responseData;
        });

        dispatch(setSelectedSideBarMenuId(item.menuId));
        dispatch(setSelectedTsstMenuId(item.tsstMenuId));
        dispatch(setSelectedCommentId(item.id));
        let url = docPostInfo.url;
        appNavigate(url, { "tsstMenuId": item.tsstMenuId, "docMenuId": item.menuId })
        // navigate(url);
    };

    const scrollToThread = () => {
        const element = document.getElementById(moveToThread);
        if (element) {
            element.scrollIntoView();
        }
    };

    return (
        <>
            {
                items.length > 0 ? items.map(e => (
                    <li key={e.id}
                        id={e.id}
                    // onLoad={scrollToThread}
                    >
                        <div className="row row1">
                            <span className="subject" onClick={() => handleClickLink(e)}>{e.title}</span>
                            <div className="utility">
                                <div className="info-wrap me-4">
                                    <button onClick={() => { addLikeOrUnlike(e.id, e.isLike) }} className={`like ${e.isLike == 'Y' ? "active" : ""}`}><em>{e.likeNumber}</em></button>
                                </div>
                                <button onClick={() => { bookmarkOrUnBookmark(e.id, e.isBookmark) }} className={`bookmark ${e.isBookmark == 'Y' ? "active" : ""}`}></button>
                            </div>
                        </div>
                        <div className="row row2">
                            <span className="location">
                                {getPath(e.menuId, afpMenus, tsstMenus)}
                            </span>
                            <div className="info-wrap">
                                <span className="user-thumb">
                                    <img src={e?.imageUrl || ""} alt="예시이미지" onError={(event: any) => {
                                        event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                                    }} />
                                </span>
                                <span className="user-name">{e.createdByNm}</span>
                                <span className="date">{dayjs(e.createdDate).format("YYYY-MM-DD HH:mm")}</span>
                            </div>
                        </div>
                    </li>
                ))
                    :
                    <li className="no-data">No data</li>
            }
        </>
    )
}

