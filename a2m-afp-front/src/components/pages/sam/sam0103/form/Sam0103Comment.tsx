// import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
// import Visibility from '@mui/icons-material/Visibility';
// import SendIcon from '@mui/icons-material/Send';
// import AttachmentIcon from '@mui/icons-material/Attachment';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import { InputText } from 'primereact/inputtext';
import { Sam0103Service } from '../../../../../services/sam/Sam0103Service';

type Sam0103WProps = {
    lists: any[],
    sendCommentAction: () => void
}

export default function Sam0103Comment(props: Sam0103WProps) {
    const { lists, sendCommentAction } = props

    const [openRepply, setOpenRepply] = useState<number>(0)

    const [newComment, setNewComment] = useState<any>(null);

    const { t, i18n } = useTranslation()

    const sendComment = () => {
        if (newComment && newComment.trim() != "") {
            Sam0103Service.getInstance().save({ commentParent: { id: openRepply }, content: newComment })
                .then(resp => {
                    if (resp.data.status) {
                        toast.success("Save successfull")
                        sendCommentAction()
                        setNewComment(null)
                        setOpenRepply(0)
                    } else {
                        toast.error("Save failed")
                    }
                })
                .catch(error => {
                    toast.error("Save error")
                })
            // Swal.fire({
            //     title: `${t('confirm.label.title')}`,
            //     text: `${t('confirm.label.message.save')}`,
            //     icon: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#809bf1',
            //     cancelButtonColor: '#727379',
            //     confirmButtonText: `${t('confirm.button.yes.text')}`,
            //     cancelButtonText: `${t('confirm.button.no.text')}`
            // }).then((result) => {
            //     if (result.value) {
            //         Sam0103Service.getInstance().save({ commentParent: { id: openRepply }, content: newComment })
            //             .then(resp => {
            //                 if (resp.data.status) {
            //                     toast.success("Save successfull")
            //                     sendCommentAction()
            //                     setNewComment(null)
            //                     setOpenRepply(0)
            //                 } else {
            //                     toast.error("Save failed")
            //                 }
            //             })
            //             .catch(error => {
            //                 toast.error("Save error")
            //             })
            //     }
            // })
        }
    }

    return (
        <div>
            <ToastContainer></ToastContainer>
            {
                lists.map((e: any) => {
                    return (
                        <span key={e.id} className="col-12">
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex col-lg-12'>
                                    <div className='comment-img-width'>
                                        <img className="rounded-circle header-profile-user" src={require('../../../../../assets/images/users/user-dummy-img.jpg')} alt="Header Avatar" />
                                    </div>
                                    <div className='comment-content-width'>
                                        <div className="d-flex col-lg-12 text-start justify-content-between">
                                            <div>
                                                <span className="fw-medium ms-1 user-name-text">{e.createdBy}</span>
                                                <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">{dayjs(e.createdDate).format("YYYY-MM-DD HH:mm:ss")}</span>
                                            </div>
                                            <div className='cus-cursor' onClick={() => { setOpenRepply(e.id); setNewComment(null) }}>
                                                <i className='ri-reply-line'></i>{t('same0103.repply.comment')}
                                            </div>
                                        </div>
                                        <p className='fs-6 ms-1 col-lg-12'>{e.content}</p>

                                        {
                                            openRepply === e.id && (
                                                <div className='mt-2 mb-3'>
                                                    {/* <OutlinedInput className='col-lg-12'
                                                        value={newComment == null ? "" : newComment}
                                                        onKeyUp={(e: any) => {
                                                            if (e.keyCode === 13) {
                                                                sendComment();
                                                            }
                                                        }}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewComment(event.target.value) }}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={sendComment} edge="end">
                                                                    <SendIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        } placeholder="Enter a comment..."
                                                    /> */}


                                                    <span className="p-input-icon-right" style={{ width: "100%" }}>
                                                        <i className="pi pi-send" />
                                                        <InputText value={newComment == null ? "" : newComment}
                                                            onKeyUp={(e: any) => {
                                                                if (e.keyCode === 13) {
                                                                    sendComment();
                                                                }
                                                            }}
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewComment(event.target.value) }}
                                                            placeholder={`${t('same0103.input.comment')}`}
                                                            style={{ width: "100%" }}
                                                        />
                                                    </span>
                                                    <div className={newComment?.trim() === "" ? "error-required" : "display-none"}>
                                                        Please enter a comment
                                                    </div>
                                                </div>
                                            )
                                        }

                                        <Sam0103Comment lists={e.listCommentChild} sendCommentAction={() => { sendCommentAction() }} />

                                    </div>
                                </div>
                            </div>
                        </span>
                    )
                })
            }
        </div>
    )
}
