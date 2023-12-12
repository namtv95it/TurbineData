import React, { useEffect, useState } from 'react'
import { AfpTab } from '../../../utils/afp/tab';
import { useAppDispatch } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import Bmk_010101 from './Bmk_010101';
import { ComPostService } from '../../../services/common/ComPostService';
import { Constant } from '../../../constants/constant';

export default function Bmk_0101(props: any) {

    const dispatch = useAppDispatch();
    const [items, setItems] = useState<any[]>([]);
    const [searchModel, setSearchModel] = useState<any>({ keySearch: "", postType: ""});

    const [comPostService] = useState<ComPostService>(new ComPostService())
    const [listPostType, setListPostType] = useState(
        [
            "",
            Constant.POST_TYPE_PROJECTS,
            Constant.POST_TYPE_DOCUMENTS,
            Constant.POST_TYPE_THREADS,
            Constant.POST_TYPE_ANNOUNCEMENTS
        ]
    )

    const tabClick = (tabIndex: number) => {
        AfpTab.showTab(tabIndex, ".tab-bookmark");
        setSearchModel({
            ...searchModel,
            postType: listPostType[tabIndex]
        })
    }

    useEffect(() => {
        getList();
    }, [searchModel])

    const getList = () => {
        dispatch(showAndHideSpinner(true))
        comPostService.searchBookmark(searchModel).then(resp => {
            if (resp.data.status) {
                setItems(resp.data.responseData)
                // dispatch(setProjectCounter(resp.data.responseData.length))
            }
            dispatch(showAndHideSpinner(false))
        }).catch(error => {
            dispatch(showAndHideSpinner(false))
        })
    }

    return (
        <>
                <div className="modal-content-area">
                    <div className="bookmark-wrap">
                        <div className="tab-type tab-type2">
                            <div className="tab-menu tab-bookmark">
                                <button onClick={() => { tabClick(0) }}  className="tab-btn active">All</button>
                                <button onClick={() => { tabClick(1) }}  className="tab-btn">Projects</button>
                                <button onClick={() => { tabClick(2) }}  className="tab-btn">Documents</button>
                                <button onClick={() => { tabClick(3) }}  className="tab-btn">Threads</button>
                                <button onClick={() => { tabClick(4) }}  className="tab-btn">Announcements</button>
                                <div className="tab-indicator"></div>
                            </div>
                            <div className="tab-content active">
                                <ul className="tab-board-lst-custom">
                                    <Bmk_010101 close={ ()=>{ props.onClose() } } items = {items}/>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
