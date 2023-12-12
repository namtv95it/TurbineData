import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { DashboardService } from "../../services/DashboardService"
import { Panel } from 'primereact/panel';
import { useAppDispatch, useAppNavigate } from "../../store/hook"
import { showAndHideSpinner } from "../../reducers/spinnerSlice"
import { AppendJsAndCss } from "../../utils/initJsAndCss"
import { AfpTab } from "../../utils/afp/tab"
import { Constant } from "../../constants/constant"
import { AfpSubTs } from "../../utils/afp/sub"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs";
import { Doc0101Service } from "../../services/doc/Doc0101Service";
import axios from "axios";
import { HeadersUtil } from "../../utils/headersUtil";
import { setSelectedSideBarMenuId, setSelectedTsstMenuId } from '../../reducers/docSideBarSlice';
import { setSelectedCommentId } from '../../reducers/threadSlice';

import { ComPostService } from "../../services/common/ComPostService";

export class DashboardSearch {
    postType: string = Constant.DASHBOARD_TYPE[0]
}

export class AnnSearch {
    postType: string = Constant.DASHBOARD_TYPE[4]
}

export class ThreadLikeSearch {
    postType: string = Constant.DASHBOARD_TYPE[5]
}

export default function Dashboard() {
    const { t } = useTranslation()
    const [lstCategory, setLstCategory] = useState<any>()
    const dispatch = useAppDispatch();
    const navagite = useNavigate();

    const [items, setItems] = useState([]);
    const [searchModel, setSearchModel] = useState<DashboardSearch>({ postType: Constant.DASHBOARD_TYPE[0] });

    const [anns, setAnns] = useState<any[]>([]);
    const [annSearch, setAnnSearch] = useState<AnnSearch>({ postType: Constant.DASHBOARD_TYPE[4] });

    const [thrLikes, setThrLikes] = useState<any[]>([]);
    const [thrLikeSearch, setThrLikeSearch] = useState<ThreadLikeSearch>({ postType: Constant.DASHBOARD_TYPE[5] });

    const handleClickLink = (url: string) => {
        navagite(url)
    }

    const handleClickLinkThread = (item: any) => {
        dispatch(setSelectedCommentId(item.id));
        const url = "/threads";
        navagite(url);
    };

    useEffect(() => {
        // getLstProject()

        AppendJsAndCss.deleteCSS(process.env.PUBLIC_URL + "/assets/css/sub.css")
        const obj = AppendJsAndCss.appendCSS(process.env.PUBLIC_URL + "/assets/css/main.css")
        return () => {

            obj?.link.remove();
            AppendJsAndCss.appendCSS(process.env.PUBLIC_URL + "/assets/css/sub.css")
        };

    }, [])

    useEffect(() => {
        AfpTab.showTab(0);
        AfpSubTs.init();
    }, [])

    useEffect(() => {
        getListAnn();
        getListThrLike();
    }, [annSearch.postType, thrLikeSearch.postType])

    useEffect(() => {
        getList()
    }, [searchModel.postType])

    const getList = () => {
        dispatch(showAndHideSpinner(true))
        DashboardService.getInstance().getPostForDashboard(searchModel).then(resp => {

            if (resp.data.status) {
                setItems(resp.data.responseData)
            } else {
                toast.error("error");
            }
            dispatch(showAndHideSpinner(false))
        }).catch(error => {
            toast.error("sys error");
            dispatch(showAndHideSpinner(false))
        })
    }

    const getListAnn = () => {
        dispatch(showAndHideSpinner(true))
        DashboardService.getInstance().getPostForDashboard(annSearch).then(resp => {
            if (resp.data.status) {
                setAnns(resp.data.responseData)
                // dispatch(setProjectCounter(resp.data.responseData.length))
            }
            dispatch(showAndHideSpinner(false))
        }).catch(error => {
            dispatch(showAndHideSpinner(false))
        })
    }

    const getListThrLike = () => {
        dispatch(showAndHideSpinner(true))
        DashboardService.getInstance().getPostForDashboard(thrLikeSearch).then(resp => {
            if (resp.data.status) {
                setThrLikes(resp.data.responseData)
                // dispatch(setProjectCounter(resp.data.responseData.length))
            }
            dispatch(showAndHideSpinner(false))
        }).catch(error => {
            dispatch(showAndHideSpinner(false))
        })
    }

    function getLstProject() {
        dispatch(showAndHideSpinner(true));
        DashboardService.getInstance().getCategories().then(result => {

            result.data.responseData.forEach((ele: any) => {
                ele['data'] = ele
                ele['key'] = ele.id
                ele['children'] = ele.projects
            })
            setLstCategory(result.data.responseData)
            dispatch(showAndHideSpinner(false));
        })

    }

    const bodyItem = (item: any) => {
        return <>
            {
                item.children ?
                    <div className="row">
                        <h4 className="item-category m-1">{item.name}</h4>

                    </div>
                    :
                    <div className="item-project">
                        <Panel header={item.projectName + ' - ' + item.version} icons={<a href={process.env.REACT_APP_PROJECT_DOWNLOAD_URL + item.projectId} type="button" className="btn btn-primary">{t('das.button.title.gotoSource')}</a>}>
                            <div className="row">
                                <div>
                                    <h5><i className=" ri-shield-flash-fill" style={{ 'color': 'var(--primary-color)' }}></i> {item.organization}</h5>
                                    <h6>{t('das.title.lastUpdated')} {Intl.DateTimeFormat("en-GB").format(new Date(item.updatedDate))}</h6>
                                </div>
                                <h6>{item.description}</h6>
                                <div className="d-flex">
                                    {
                                        item.tags.map((tag: any) =>
                                            <span key={tag.tagId} className="badge badge-soft-primary mx-1">{tag.tagName}</span>
                                        )
                                    }
                                </div>
                            </div>


                        </Panel>
                    </div>
            }
        </>
    }

    const tabClick = (tabIndex: number) => {
        AfpTab.showTab(tabIndex);
        setSearchModel({
            ...searchModel,
            postType: Constant.DASHBOARD_TYPE[tabIndex]
        })
    }

    return (
        // <Fragment>
        //     <div className="card">
        //         <div className="card-body">
        //             <div className='title-head-body project-list'>
        //                 <h1 className="mb-sm-0 card-title mb-0 flex-grow-1">
        //                     {t('das.title.menu.dashboard')}
        //                 </h1>
        //             </div>
        //             <div className="card-body">
        //                 <div className="list-category">
        //                     <TreeTable id="lst-project" value={lstCategory} hidden>
        //                         <Column style={{ width: 0 }} expander></Column>
        //                         <Column body={bodyItem}></Column>
        //                     </TreeTable>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>


        // </Fragment>
        <article className="content-area">
            <div className="content-box">
                <div className="tit-wrap">
                    <h1>Announcements</h1>
                    <a onClick={() => handleClickLink("/ann")} className="more-btn" style={{ cursor: "pointer" }}>MORE</a>
                </div>
                <ul className="board-lst">
                    {
                        anns.length > 0 ? anns.map(e => (
                            <li key={e.id}>
                                <a onClick={() => navagite("/ann", { state: { postId: e.id } })} >
                                    <span className="subject">{e.title}</span>
                                    <span className="date">{dayjs(e.createdDate).format("YYYY-MM-DD HH:mm")}</span>
                                </a>
                            </li>
                        ))
                            :
                            <li className="no-data">No data</li>
                    }
                </ul>
            </div>
            <div className="content-box">
                <div className="tit-wrap">
                    <h1>Most-liked threads</h1>
                    <a className="more-btn" onClick={() => handleClickLink("/threads")} style={{ cursor: "pointer" }}>MORE</a>
                </div>
                <ul className="board-lst">
                    {
                        thrLikes.length > 0 ? thrLikes.map(e => (
                            <li key={e.id}>
                                <a onClick={() => handleClickLinkThread(e)}>
                                    <span className="subject">{e.title}</span>
                                    <span className="like">{e.numberLike}</span>
                                </a>
                            </li>
                        ))
                            :
                            <li className="no-data">No data</li>
                    }
                </ul>
            </div>

            <div className="content-box">
                <div className="tit-wrap">
                    <h1>What’s new</h1>
                </div>

                <div className="tab-wrap">
                    <div className="tab-type1">
                        <div className="tab-menu">
                            <button onClick={() => { tabClick(0) }} className="tab-btn">All</button>
                            <button onClick={() => { tabClick(1) }} className="tab-btn">Projects</button>
                            <button onClick={() => { tabClick(2) }} className="tab-btn">Documents</button>
                            <button onClick={() => { tabClick(3) }} className="tab-btn">Threads</button>
                            <div className="tab-indicator"></div>
                        </div>

                        <div className="tab-content active">
                            <ul className="tab-board-lst">
                                <DashboardItem items={items} refreshItems={() => { getList() }} />
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    )
}

type DashboardItemProps = {
    items: any[]
    refreshItems: () => void
}

export function DashboardItem(props: DashboardItemProps) {

    const [items, setItems] = useState(props.items);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [comPostService] = useState<ComPostService>(new ComPostService());

    const appNavigate = useAppNavigate();

    useEffect(() => {
        setItems(props.items)
    }, [props.items])

    const typeMappings: any = {
        '09-01': { className: 'head-badge badge1', typeName: 'Projects' },
        '09-02': { className: 'head-badge badge2', typeName: 'Doc' },
        '09-03': { className: 'head-badge badge3', typeName: 'Thread' },
        // Add more mappings for other types
    };

    const [afpMenus, setAfpMenus] = useState([]);

    const [tsstMenus, setTsstMenus] = useState<any>([])

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

    function generateURL(tsstMenuId: any): string {
        const foundMenu = tsstMenus.find((menu: any) =>
            menu.tsstMenuDtos.some((submenu: any) => submenu.menuId === tsstMenuId)
        );

        if (foundMenu) {
            const submenu = foundMenu.tsstMenuDtos.find((submenu: any) => submenu.menuId === tsstMenuId);
            if (submenu) {
                return `${submenu.url}`;
            }
        }

        return "";
    }

    const handleClickLink = (item: any) => {
        if (item.postType === "09-01") {
            navigate("/project", { state: { postId: item.id } });
        } else {
            dispatch(setSelectedSideBarMenuId(item.menuId));
            dispatch(setSelectedTsstMenuId(item.tsstMenuId));
            if (item.postType === "09-03") {
                dispatch(setSelectedCommentId(item.id));
            }
            const tsstMenuId = item.tsstMenuId;
            const url = generateURL(tsstMenuId);
            appNavigate(url, { "tsstMenuId": item.tsstMenuId, "docMenuId": item.menuId })
        }
    };

    // const handleClickLink = async (item: any) => {

    //     if (item.postType === "09-01") {
    //         navigate("/project", { state: { postId: item.id } });
    //     } else {
    //         let docPostInfo: any = {};
    //         await comPostService.getDocumentPostInfo(item.postId).then(res => {
    //             docPostInfo = res.data.responseData;
    //         });

    //         dispatch(setSelectedSideBarMenuId(item.menuId));
    //         dispatch(setSelectedTsstMenuId(item.tsstMenuId));
    //         dispatch(setCommentId(item.id));
    //         let url = docPostInfo.url;
    //         navigate(url);
    //     }
    // };

    return (
        <>
            {
                items.length > 0 ? items.map((e, index) => (
                    <li key={index}>

                        <span className={typeMappings[e.postType]?.className}>
                            {typeMappings[e.postType]?.typeName}
                        </span>
                        <a className="subject" onClick={() => handleClickLink(e)}>
                            {(e.postType == '09-03' || e.postType == '09-02') ?
                                <> [
                                    <i style={{ fontStyle: 'italic' }}>{getPath(e.menuId, afpMenus, tsstMenus)}</i>
                                    ] &nbsp;
                                </>
                                : <></>
                            }
                            {e.title}
                        </a>

                    </li>
                ))
                    :
                    <li className="no-data">No data</li>
            }
        </>
    )
}