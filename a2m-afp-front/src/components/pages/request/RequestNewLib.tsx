import React, { useEffect, useState } from 'react'
import { RequestNewLibService } from '../../../services/request/RequestNewLibService'
import { Constant } from '../../../constants/constant'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { toast } from 'react-toastify';
import AppModal from '../../commons/afp/AppModal';
import ViewRequest from './ViewRequest';
import RequestForm from './RequestForm';

export default function RequestNewLib() {

    const dispatch = useAppDispatch();
    const [lstRequest, setLstRequest] = useState<any>([])
    const [keySearch, setKeySearch] = useState<any>("")
    const [showModalDetail, setShowModalDetail] = useState<any>(false)
    const [showForm, setShowForm] = useState<any>(false)
    const [selectedRequest, setSelectedRequest] = useState<any>()
    const userInfo = useAppSelector(state => state.userInfo.userInfo)
    useEffect(() => {
        _getRequest()
    }, [])

    function _getRequest() {
        dispatch(showAndHideSpinner(true))
        RequestNewLibService.getInstance().getRequest({ keySearch: keySearch }).then((response: any) => {
            if (response.data.status === true) {
                setLstRequest(response.data.responseData)
            } else {
                toast.error("Server error")
            }
            dispatch(showAndHideSpinner(false))
        }).catch((error: any) => {
            toast.error("Server error")
        })
    }

    const handleChangeInput = (event: any) => {
        setKeySearch(event.target.value)
    }

    const openDetailModal = (postId: any) => {
        setSelectedRequest(postId)
        setShowModalDetail(true);
    }
    const closeDetailModal = (data?: any) => {
        setShowModalDetail(false);
    }
    const onCloseDetail = (event: any, message?: any) => {
        if (event) {
            toast.success(message)
            _getRequest()
        } else {
            setShowForm(true);

        }
        setShowModalDetail(false);
    }

    const handleShowForm = () => {
        setShowForm(true);
    }

    const closeForm = () => {
        setShowForm(false)
    }

    const onCloseForm = (event: any) => {
        if (event.status) {
            _getRequest()
        }
        setShowForm(false)
    }


    return (
        <>
            <article className="content-area">
                <div className="tit-area">
                    <h1 className="heading1">Request new library</h1>
                    <button className="btn1" onClick={() => { handleShowForm(); setSelectedRequest(null) }}>
                        <i className="xi-plus-min"></i>
                    </button>
                    <div className="side-wrap">
                        <div className="search-area2">
                            <input type="text" placeholder="search" value={keySearch} onChange={handleChangeInput}
                                onKeyUp={(e: any) => {
                                    if (e.key === 'Enter') {
                                        _getRequest()
                                    }
                                }} />
                        </div>
                    </div>
                </div>
                <ul className="tab-board-lst">
                    {
                        lstRequest.length > 0 ? lstRequest.map((item: any) =>
                            <li key={item.postId}>
                                <div className="row row1">
                                    <a onClick={() => openDetailModal(item.postId)} className="subject">{item.title}</a>
                                </div>
                                <div className="row row2">
                                    <span className="state">
                                        <em className={item.status == Constant.REQUEST_STATUS_REJECTED ? "reject"
                                            : (item.status == Constant.REQUEST_STATUS_APPROVED ? "approve" : "request")}>{item.statusNm}</em>
                                    </span>
                                    <div className="info-wrap">
                                        <span className="user-thumb">
                                            <img src={item.authorImgUrl || ""} alt="예시이미지" onError={(event: any) => {
                                                event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                                            }} />
                                        </span>
                                        <span className="user-name">{item.authorName}</span>
                                        <span className="date">{dayjs(item.createdDate).format("YYYY-MM-DD")}</span>
                                        <span className="time">{dayjs(item.createdDate).format("HH:mm")}</span>
                                    </div>
                                </div>
                            </li>
                        )
                            :
                            <li>No data</li>
                    }

                </ul>
            </article>
            {
                showModalDetail && (
                    <AppModal open={showModalDetail} onClose={closeDetailModal} >
                        <ViewRequest requestId={selectedRequest} onClose={onCloseDetail}></ViewRequest>
                    </AppModal>
                )
            }
            {
                showForm && (
                    <AppModal open={showForm} onClose={closeForm} >
                        <RequestForm requestId={selectedRequest} onClose={onCloseForm}></RequestForm>
                    </AppModal>
                )
            }
        </>

    )
}
