import React, { useEffect, useState } from 'react'
import { RequestNewLibService } from '../../../services/request/RequestNewLibService'
import dayjs from 'dayjs';
import RequestComment from './RequestComment';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { Constant } from '../../../constants/constant';
import { ComPostService } from '../../../services/common/ComPostService';

export default function ViewRequest(props: any) {

    const { t, i18n } = useTranslation()
    const dispatch = useAppDispatch()
    const [request, setRequest] = useState<any>("")
    const [isShowContextMenu, setIsShowContextMenu] = useState<any>(false)
    const [showForm, setShowForm] = useState<any>(false)
    const userInfo = useAppSelector(state => state.userInfo.userInfo)
    const [comPostService] = useState<ComPostService>(new ComPostService());

    $(document).on("mouseup", function (e: any) {
        let menuActive = $('.context-menu.active')
        if (menuActive.has(e.target).length === 0) {
            setIsShowContextMenu(false)
        }
    });

    useEffect(() => {
        _getRequestById()
        comPostService.increasePostView(props.requestId)
        .then(resp => {
        })
        .catch(error => {
        })
    }, [])


    function _getRequestById() {
        dispatch(showAndHideSpinner(true));
        RequestNewLibService.getInstance().getRequestById({ requestId: props.requestId }).then((response: any) => {
            if (response.data.status) {
                let dto = response.data.responseData;
                dto.viewNumber++;
                setRequest(dto);
            } else {
                toast.error("Server error");
            }
            dispatch(showAndHideSpinner(false));
        }).catch((error: any) => {
            toast.error("Server error");
            dispatch(showAndHideSpinner(false));
        })
    }

    const handleChangePost = (post: any) => {
        if (props.onChangePost) {
            props.onChangePost(post);
        }
        setRequest({
            ...request,
            commentNumber: post?.commentNumber
        })
    }


    const closeForm = () => {
        setShowForm(false)
    }

    const handleEdit = () => {
        props.onClose(false)
    }


    const handleDelete = () => {
        Swal.fire({
            title: `${t('confirm.label.title')}`,
            text: `${t('confirm.label.message.delete')}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#809bf1',
            cancelButtonColor: '#727379',
            confirmButtonText: `${t('confirm.button.yes.text')}`,
            cancelButtonText: `${t('confirm.button.no.text')}`
        }).then((result) => {
            if (result.value) {
                RequestNewLibService.getInstance().deleteRequest({ requestId: request.requestId }).then((res: any) => {
                    if (res.data.status) {
                        props.onClose(true, "Delete request successfully")
                    } else {
                        toast.error("Delete request failed")
                    }
                }).catch((err) => {
                    toast.error("Delete request failed")
                })
            }
        })
    }
    const handleUpdateStatus = (status: any) => {
        Swal.fire({
            title: `${t('confirm.label.title')}`,
            text: "Are you sure update this item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#809bf1',
            cancelButtonColor: '#727379',
            confirmButtonText: `${t('confirm.button.yes.text')}`,
            cancelButtonText: `${t('confirm.button.no.text')}`
        }).then((result) => {
            if (result.value) {
                const param = {
                    status: status,
                    requestId: request.requestId
                }
                RequestNewLibService.getInstance().updateRequestStatus(param).then((response: any) => {
                    if (response.data.status) {
                        props.onClose(true, "Update status successfully")
                    } else {
                        toast.error("Update unsuccessfully")
                    }
                }).catch((error: any) => {
                    toast.error("Update unsuccessfully")
                })
            }
        })


    }
    return (
        <>
            <div className="modal-cont">
                <h1 className="modal-tit">{request.title}</h1>
                <div className="modal-content-area">

                    <div className="modal-announce-wrap">
                        <div className="board-lst view-type-single">
                            <div className="info-wrap">
                                <span className="user-thumb">
                                    <img src={request.authorImg || ""} alt="예시이미지" onError={(event: any) => {
                                        event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                                    }} />
                                </span>
                                <span className="user-name">{request.authorName}</span>
                                <span className="date">{dayjs(request.createdDate).format("YYYY-MM-DD")}</span>
                                <span className="time">{dayjs(request.createdDate).format("HH:mm")}</span>
                                <span className="line"></span>
                                <span className="views">Views<em>{isNaN(request.viewNumber) ? 0 : request.viewNumber}</em></span>
                                <span className="reply">Reply<em>{isNaN(request.commentNumber) ? 0 : request.commentNumber}</em></span>
                            </div>
                            <div className="utility">
                                {
                                    (userInfo.userUid == request.createdBy || userInfo.rolesStr.toString().includes(Constant.ADMIN_ROLE)) &&
                                    <button className="more" onClick={() => setIsShowContextMenu(true)}></button>
                                }


                                <div className={`context-menu ${isShowContextMenu === true ? 'active' : ''}`}>
                                    {
                                        userInfo.userUid == request.createdBy &&
                                        <>
                                            <button className="edit" onClick={handleEdit}>Edit</button>
                                            <button className="delete" onClick={handleDelete}>Delete</button>
                                        </>
                                    }

                                    {
                                        userInfo.rolesStr.toString().includes(Constant.ADMIN_ROLE) &&
                                        <>
                                            <button className="approve" onClick={() => handleUpdateStatus(Constant.REQUEST_STATUS_APPROVED)}>Approved</button>
                                            <button className="reject" onClick={() => handleUpdateStatus(Constant.REQUEST_STATUS_REJECTED)}>Rejected</button>
                                        </>
                                    }

                                </div>

                            </div>
                            <div className="board-body"
                                dangerouslySetInnerHTML={{ __html: request.description }}
                            ></div>

                            <RequestComment
                                postId={request.requestId}
                                onChangePost={(post: any) => {
                                    handleChangePost(post)
                                }} />
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}
