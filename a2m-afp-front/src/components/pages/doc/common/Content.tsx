import { useEffect, useState, useCallback, useRef } from 'react';
import { Doc0101Service } from '../../../../services/doc/Doc0101Service';
import AppComment from '../../../commons/afp/AppComment';
import { ComPostService } from '../../../../services/common/ComPostService';
import { Constant } from '../../../../constants/constant';
import { useAppDispatch } from '../../../../store/hook';
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice';
import { MarkdownUtil } from '../../../../utils/markdown';
import Swal from "sweetalert2";
import PostPopup from '../popup/PostPopup';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectedSideBarMenuIdSelector } from '../../../../reducers/docSideBarSlice';
import { selectedCommentIdSelector } from '../../../../reducers/threadSlice';

import { toast } from 'react-toastify';
import { AuthConstant } from '../../../../constants/authConstant';

export default function Content() {

    const [doc0101Service] = useState<Doc0101Service>(new Doc0101Service());
    const [comPostService] = useState<ComPostService>(new ComPostService());

    const dispatch = useAppDispatch();
    const selectedMenuId = useSelector(selectedSideBarMenuIdSelector);
    const userInfo = useSelector((state: any) => state.userInfo.userInfo);

    const [menuInfo, setMenuInfo] = useState<any>({});
    const [post, setPost] = useState<any>({});
    const [postId, setPostId] = useState(NaN);
    const [bookmarkActive, setBookmarkActive] = useState(false);
    const [isShowDropDownAction, setIsShowDropDownAction] = useState(false);
    const [isShowModalPost, setIsShowModalPost] = useState(false);
    const [markdownToHtml, convertMarkdownToHtml] = useState("");

    const moveToCommentIdStore = useSelector(selectedCommentIdSelector);
    const [moveToComment, setMoveToComment] = useState(moveToCommentIdStore);
    const [isGetAll, setIsGetAll] = useState(false);
    const prevSelectedMenuIdRef = useRef(selectedMenuId);

    const eventListener = useCallback((e: any) => {
        var container = $("div .context-menu");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            setIsShowDropDownAction(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mouseup", eventListener);
    }, []);

    useEffect(() => {
        if (selectedMenuId) {
            getPost(selectedMenuId);
            getMenu(selectedMenuId);
        }
    }, [selectedMenuId]);

    const onClickBookmark = () => {
        saveBookmarkOrUnBookmark();
        setBookmarkActive(!bookmarkActive);
    }

    const getPost = (menuId: any) => {
        dispatch(showAndHideSpinner(true));
        doc0101Service.getPostByAfpMenu(menuId).then(res => {
            if (res.data.status) {
                let data = res.data.responseData;
                const md = MarkdownUtil.getInstance();
                if (data) {
                    convertMarkdownToHtml(md.render(data?.description));
                    setBookmarkActive(data?.bookmarked);
                    setPost(data);
                    setPostId(data?.id)
                } else {
                    setPost(NaN);
                    setPostId(NaN);
                }
            }
            dispatch(showAndHideSpinner(false));
        })
    }

    const getMenu = (menuId: any) => {
        doc0101Service.getMenuById(menuId).then(res => {
            setMenuInfo(res.data.responseData);
        });
    }

    const saveBookmarkOrUnBookmark = () => {
        dispatch(showAndHideSpinner(true));
        let request: any = {
            postId: post.id
        }
        if (bookmarkActive) {
            request.isBookmark = Constant.BOOKMARK_STATUS.YES;
        } else {
            request.isBookmark = Constant.BOOKMARK_STATUS.NO;
        }

        comPostService.bookmarkOrUnBookmark(request).then(res => {
            dispatch(showAndHideSpinner(false));
        });
    }

    const handleEditPost = () => {
        openPopupPost();
    }

    const handleDeletePost = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#809bf1",
            cancelButtonColor: "#727379",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.value) {
                dispatch(showAndHideSpinner(true));
                doc0101Service.deletePostById(postId).then(res => {
                    if (res.data.status) {
                        toast.success("Save successfull");
                        getPost(selectedMenuId);
                    } else {
                        toast.error("Save failed, An error occurred during processing");
                    }
                    dispatch(showAndHideSpinner(false));
                });
            }
        });
    }

    const openPopupPost = () => {
        setIsShowModalPost(true);
    }

    const onClosePopupPost = (event: any) => {
        setIsShowModalPost(false);
        if (event) {
            getPost(selectedMenuId);
        }
    }

    useEffect(() => {
        const prevSelectedMenuId = prevSelectedMenuIdRef.current;

        if (moveToComment && selectedMenuId === prevSelectedMenuId) {
            // Khi moveToComment và selectedMenuId không thay đổi
            setIsGetAll(true)
        } else {
            setIsGetAll(false)
        }
        prevSelectedMenuIdRef.current = selectedMenuId;

    }, [moveToComment, selectedMenuId]);

    return (
        <>
            <article className="content-area">
                {
                    selectedMenuId ?
                        <>
                            {
                                postId ?
                                    <>
                                        <div className="tit-area">
                                            <h1 className="heading1">{menuInfo.name || ''}</h1>
                                        </div>
                                        <div className="utility" style={{ position: 'absolute', top: '26px', right: '35px', display: 'flex', flexDirection: 'column' }}>
                                            {(userInfo?.rolesStr || "").includes(AuthConstant.ROLE_ADMIN) ?
                                                <>
                                                    <button className="more" onClick={() => setIsShowDropDownAction(true)}></button>
                                                    <div className={'context-menu ' + (isShowDropDownAction ? ' active' : '')}>
                                                        <button className="edit" onClick={handleEditPost}>Edit</button>
                                                        <button className="delete" onClick={handleDeletePost}>Delete</button>
                                                    </div>
                                                </>
                                                : ""
                                            }

                                            <button className={'bookmark ' + (bookmarkActive ? 'active' : '')} title="북마크" onClick={onClickBookmark}></button>

                                        </div>
                                        <div className="date-info-wrap">
                                            <span className="update">Last updated</span>
                                            <span className="date">{post?.updatedDate ? dayjs(post?.updatedDate).format("YYYY-MM-DD HH:mm") : dayjs(post?.createdDate).format("YYYY-MM-DD HH:mm")}</span>
                                        </div>
                                        <div className="board-lst scroll-wrap" style={{ maxHeight: 'calc(100% - 83px)', overflowY: 'auto' }}>
                                            <div className="documents-body markdown-body">
                                                <div className='result-html mt-3' dangerouslySetInnerHTML={{ __html: markdownToHtml }}></div>
                                            </div>
                                            <AppComment postId={postId} hideLikePost={true} isGetAll={isGetAll} />
                                        </div>
                                    </>
                                    :
                                    <div style={{ position: "relative", width: "100%", height: "100%" }}>

                                        <div className='doc-conten-center'>
                                            <p style={{ textAlign: 'center', alignItems: 'center' }}> No content yet</p>
                                            <div style={{ width: "100%", textAlign: 'center', marginTop: '15px' }}>
                                                <button type="button" className="btn2" onClick={handleEditPost} >Add content</button>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </>
                        :
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>

                            <div className='doc-conten-center'>
                                <p> No content selected yet</p>
                            </div>
                        </div>
                }



            </article>
            {
                isShowModalPost ? <PostPopup title={menuInfo.name} afpMenuId={menuInfo.id} post={post} onClose={(event) => onClosePopupPost(event)} /> : ""
            }

        </>
    )
}
