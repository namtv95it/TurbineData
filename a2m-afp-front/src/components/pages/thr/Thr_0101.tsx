import React, { Component, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { Thr0101Service } from '../../../services/thr/Thr0101Service';
import { toast } from 'react-toastify';
import { AfpTab } from '../../../utils/afp/tab';
import { AfpSubTs } from '../../../utils/afp/sub';
import { ThreadsSearch } from '../../../model/thr/ThreadsSearch';
import { Constant } from '../../../constants/constant';
import Thr_010101 from './Thr_010101';
import { useSelector } from 'react-redux';
import { selectedIsBookmarkSelector, selectedCommentIdSelector, resetSelectedCommentId, resetSelectedIsBookmark } from '../../../reducers/threadSlice';


export default function Thr_0101() {

    const dispatch = useAppDispatch();

    const [searchModel, setSearchModel] = useState<ThreadsSearch>({ keySearch: "", typeSearch: Constant.THREADS_TYPE[0] });

    const [items, setItems] = useState<any>([]);

    const selectedCommentId = useSelector(selectedCommentIdSelector);

    const selectedIsbookmark = useSelector(selectedIsBookmarkSelector);

    const [isBookmark, setIsBookmark] = useState(selectedIsbookmark);

    const [moveToThread, setMoveToThread] = useState(selectedCommentId);

    useEffect(() => {
        AfpTab.showTab(0);
        AfpSubTs.init();
    }, [])

    useEffect(() => {
        setMoveToThread(selectedCommentId)
        setIsBookmark(selectedIsbookmark)
    }, [selectedCommentId, selectedIsbookmark])

    const handleBookmarkChange = () => {
        if (isBookmark === 'Y') {
            AfpTab.showTab(5);
            setSearchModel({
                ...searchModel,
                typeSearch: Constant.THREADS_TYPE[5]
            });
            dispatch(resetSelectedIsBookmark(null));
        }
    };

    useEffect(() => {
        handleBookmarkChange();
        getList()
    }, [isBookmark, Constant.THREADS_TYPE[5], moveToThread]);

    useEffect(() => {
        if (isBookmark !== "Y") {
            getList()
        }

    }, [searchModel.typeSearch])

    const getList = () => {
        dispatch(showAndHideSpinner(true))
        if (isBookmark === "Y") {
            searchModel.typeSearch = Constant.THREADS_TYPE[5]
        }
        Thr0101Service.getInstance().getList(searchModel).then(resp => {

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

    const tabClick = (tabIndex: number) => {
        AfpTab.showTab(tabIndex);
        setSearchModel({
            ...searchModel,
            typeSearch: Constant.THREADS_TYPE[tabIndex]
        })
        dispatch(resetSelectedCommentId(null));
    }

    const handleChangeInput = (event: any) => {
        setSearchModel({
            ...searchModel,
            keySearch: event.target.value
        })
    }

    return (
        <article className="content-area">
            <div className="tit-area">
                <h1 className="heading1">Threads</h1>
                <div className="side-wrap">
                    <div className="search-area2">
                        <input value={searchModel.keySearch} onChange={handleChangeInput}
                            onKeyUp={(e: any) => {
                                if (e.key === 'Enter') {
                                    getList()
                                }
                            }}
                            type="text" placeholder="search" />
                    </div>
                </div>
            </div>
            <div className="tab-wrap">
                <div className="tab-type2">
                    <div className="tab-menu">
                        <button onClick={() => { tabClick(0) }} className="tab-btn">All</button>
                        <button onClick={() => { tabClick(1) }} className="tab-btn">Guide</button>
                        <button onClick={() => { tabClick(2) }} className="tab-btn">Code conventions</button>
                        <button onClick={() => { tabClick(3) }} className="tab-btn">Common libraries</button>
                        <button onClick={() => { tabClick(4) }} className="tab-btn">Component templates</button>
                        <button onClick={() => { tabClick(5) }} className="tab-btn">Bookmarked</button>
                        <div className="tab-indicator"></div>
                    </div>

                    <div className="tab-content active">
                        <ul className="tab-board-lst">
                            <Thr_010101 items={items} moveToThread={moveToThread} refreshItems={() => { getList() }} threadsType={searchModel.typeSearch} />
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    )
}
