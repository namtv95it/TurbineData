import { useEffect, useState } from 'react'
import { useAppDispatch, useAppNavigate } from '../../../store/hook';
import { Constant } from '../../../constants/constant';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { ComPostService } from '../../../services/common/ComPostService';
import { setSelectedSideBarMenuId, setSelectedTsstMenuId } from '../../../reducers/docSideBarSlice';
import { setSelectedIsBookmark, setSelectedCommentId } from '../../../reducers/threadSlice';

import { useNavigate } from 'react-router-dom';

export default function Bmk_010101(props: any) {

    const [comPostService] = useState<ComPostService>(new ComPostService());

    const navigate = useAppNavigate();

    const dispatch = useAppDispatch();
    const navigateWithStats = useNavigate()

    const [items, setItems] = useState(props.items);

    useEffect(() => {
        setItems(props.items)
    }, [props.items])

    const handleClickBookmark = (bookmark: any) => {
        dispatch(showAndHideSpinner(true));
        props.close()
        switch (bookmark.postType) {
            case Constant.POST_TYPE_PROJECTS:
                handleClickProject(bookmark.postId)
                break;
            case Constant.POST_TYPE_DOCUMENTS:
                handleClickDocument(bookmark.postId)
                break;
            case Constant.POST_TYPE_THREADS:
                handleClickThread(bookmark.postId)
                break;
            case Constant.POST_TYPE_ANNOUNCEMENTS:
                handleClickAnnoun(bookmark.postId)
                break;

            default:
                break;
        }
        dispatch(showAndHideSpinner(false));
    }

    const handleClickProject = (postId: number) => {
        // let url = "";
        navigateWithStats("/project", { state: { postId: postId } })
    }

    const handleClickDocument = async (postId: number) => {
        let docPostInfo: any = {};
        await comPostService.getDocumentPostInfo(postId).then(res => {
            docPostInfo = res.data.responseData;
        });
        dispatch(setSelectedSideBarMenuId(docPostInfo.afpMenuId));
        dispatch(setSelectedTsstMenuId(docPostInfo.tsstMenuId));
        let url = docPostInfo.url;
        navigate(url, { "tsstMenuId": docPostInfo.tsstMenuId, "docMenuId": docPostInfo.afpMenuId });
    }

    const handleClickThread = (postId: number) => {
        dispatch(setSelectedCommentId(postId));
        dispatch(setSelectedIsBookmark("Y"));
        const url = "/threads";
        navigate(url);
    }

    const handleClickAnnoun = (postId: number) => {
        // let url = "";
        navigateWithStats("/ann", { state: { postId: postId } })
    }

    // const getDocumentPostInfo = (postId: any) => {
    //     comPostService
    // }

    return (
        <>
            {
                items.length > 0 ? items.map((e: any, index: any) => (
                    <li key={index} onClick={() => handleClickBookmark(e)} >
                        <span className={`head-badge ${e.postType === Constant.POST_TYPE_PROJECTS ? "badge1" :
                            e.postType === Constant.POST_TYPE_DOCUMENTS ? "badge2" :
                                e.postType === Constant.POST_TYPE_THREADS ? "badge3" :
                                    e.postType === Constant.POST_TYPE_ANNOUNCEMENTS ? "badge4" : ""
                            }`}>{e.postType === Constant.POST_TYPE_PROJECTS ? "Projects" :
                                e.postType === Constant.POST_TYPE_DOCUMENTS ? "Doc" :
                                    e.postType === Constant.POST_TYPE_THREADS ? "Thread" :
                                        e.postType === Constant.POST_TYPE_ANNOUNCEMENTS ? "Announce" : ""
                            }</span>

                        <a className="subject">{e.title}</a>
                    </li>
                ))
                    :
                    <li className="no-data">No data</li>
            }
        </>
    )
}

