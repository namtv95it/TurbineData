import React, { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Sam0103Comment from './form/Sam0103Comment';
// import { InputAdornment, OutlinedInput } from '@mui/material'
// import SendIcon from '@mui/icons-material/Send';
import { toast, ToastContainer } from 'react-toastify';
// import IconButton from '@mui/material/IconButton';
import { InputText } from 'primereact/inputtext';
import { Sam0103Service } from '../../../../services/sam/Sam0103Service';
import { Sam0101Service } from '../../../../services/sam/Sam0101Service';
import { Constant } from '../../../../constants/constant';
import { CommonUtil } from '../../../../utils/commonUtil';
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice';
import { useAppDispatch } from '../../../../store/hook';

export default function Sam0103V() {
    const params = useParams()
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const qaId = params.qa;
    const dispatch = useAppDispatch();

    const [item, setItem] = useState<any>({})

    useEffect(() => {
        if (isNaN(Number(qaId))) {
            navigate("/sam/sam0103", { replace: true })
        } else {
            Sam0103Service.getInstance().getQAById({ id: Number(qaId) })
                .then(resp => {
                    if (resp.data.status) {
                        setItem(resp.data.responseData)
                        getListComment(resp.data.responseData)
                    }
                })
                .catch(error => {

                })
        }
    }, [])

    const [newComment, setNewComment] = useState<any>(null);

    const sendComment = () => {
        if (newComment && newComment.trim() != "") {
            Sam0103Service.getInstance().save({ postId: item.id, content: newComment })
                .then(resp => {
                    if (resp.data.status) {
                        toast.success("Save successfull")
                        setNewComment(null)
                        getListComment(item)
                    } else {
                        toast.error("Save failed")
                    }
                })
                .catch(error => {
                    toast.error("Save error")
                })
            //   Swal.fire({
            //     title: `${t('confirm.label.title')}`,
            //     text: `${t('confirm.label.message.save')}`,
            //     icon: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#809bf1',
            //     cancelButtonColor: '#727379',
            //     confirmButtonText: `${t('confirm.button.yes.text')}`,
            //     cancelButtonText: `${t('confirm.button.no.text')}`
            //   }).then((result) => {
            //     if (result.value) {
            //       Sam0103Service.getInstance().save({ postId: item.id, content: newComment })
            //         .then(resp => {
            //           if (resp.data.status) {
            //             toast.success("Save successfull")
            //             setNewComment(null)
            //             getListComment(item)
            //           } else {
            //             toast.error("Save failed")
            //           }
            //         })
            //         .catch(error => {
            //           toast.error("Save error")
            //         })
            //     }
            //   })
        }
    }

    const [commentList, setCommentList] = useState<any>([])

    const getListComment = (element: any) => {
        dispatch(showAndHideSpinner(true))
        Sam0103Service.getInstance().getListComment({ id: element.id })
            .then(resp => {
                if (resp.data.status) {
                    setCommentList(resp.data.responseData)
                } else {
                    toast.error(resp.data.message)
                    setCommentList([])
                }
                dispatch(showAndHideSpinner(false))
            })
            .catch(error => {
                toast.error("Save failed")
                dispatch(showAndHideSpinner(false))
            })
    }

    const [category, setCategory] = useState<any>([])
    const [topicSearch, setTopicSearch] = useState<any>([])

    useEffect(() => {

        Sam0101Service.getInstance().getListTccoStd({ upCommCd: Constant.CATEGORY })
            .then(async resp => {
                if (resp.data.status) {
                    let tempTopic: any = []
                    for (let step = 0; step < resp.data.responseData.length; step++) {
                        let item = resp.data.responseData[step];
                        await Sam0101Service.getInstance().getListTccoStd({ upCommCd: item['commCd'] })
                            .then(respChild => {
                                if (respChild.data.status) {
                                    for (let stepChild = 0; stepChild < respChild.data.responseData.length; stepChild++) {
                                        let itemTopic = respChild.data.responseData[stepChild];
                                        tempTopic.push({
                                            label: itemTopic['commNmEn'],
                                            value: itemTopic['commCd'],
                                            labelKr: itemTopic['commNm'],
                                        })
                                    }
                                }
                            })
                            .catch(error => {

                            })

                    }
                    setTopicSearch(tempTopic)
                }
            })
            .catch(error => {

            })
    }, [])

    const lang = localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA

    const translate = useCallback((item: any, jobs: any) => {
        return CommonUtil.translate(jobs, item, lang)
    }, [lang])

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="card">
                <div className="card-body">
                    {/* <div className='d-flex justify-content-between mb-3'>
                    <div>

                    </div>
                    <div>
                        <button onClick={clickBack} type="button" className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-3" ><i className="ri-arrow-go-back-line label-icon align-middle rounded-pill fs-16 me-2"></i> Back</button>
                    </div>
                </div> */}
                    <div className='d-flex justify-content-center'>
                        <div className='col-lg-8 profile-info'>
                            <h3 className='profile-name'>{item?.title}</h3>
                            <div className='short-descrip color-community fs-4'>{translate(item?.topic, topicSearch)}</div>
                            <div className='author-bio fs-5 innerHtml' dangerouslySetInnerHTML={{ __html: item?.content }}></div>
                            <div className='mt-3'>
                                <label className='color-community fs-5'>{t('same0103.view.comment')}</label>
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
                                        } placeholder={`${t('same0103.input.comment')}`}
                                    /> */}
                                    <span className="p-input-icon-right" style={{width: "100%"}}>
                                        <i className="pi pi-send" />
                                        <InputText value={newComment == null ? "" : newComment}
                                            onKeyUp={(e: any) => {
                                                if (e.keyCode === 13) {
                                                    sendComment();
                                                }
                                            }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewComment(event.target.value) }}
                                            placeholder={`${t('same0103.input.comment')}`}
                                            style={{width: "100%"}}
                                        />
                                    </span>
                                    <div className={newComment?.trim() === "" ? "error-required" : "display-none"}>
                                        {t('same0103.required.comment')}
                                    </div>
                                </div>
                                <Sam0103Comment lists={commentList} sendCommentAction={() => { getListComment(item) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
