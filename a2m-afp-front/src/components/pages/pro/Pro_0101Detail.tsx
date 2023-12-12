import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Pro0101Service } from '../../../services/pro/Pro0101Service';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import dayjs from 'dayjs';
import { CommonUtil } from '../../../utils/commonUtil';
import { AuthConstant } from '../../../constants/authConstant';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

export default function Pro_0101Detail(props: any) {


    const userInfo = useAppSelector(state => state.userInfo.userInfo)
    const [openAction, setOpenAction] = useState(false)
    const [projectDto, setProjectDto] = useState<any>();
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation()

    const eventListener = useCallback((e: any) => {
        var container = $("div .context-menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            setOpenAction(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mouseup', eventListener);
        return () => {
            document.removeEventListener('mouseup', eventListener);
        }
    }, [])

    useEffect(() => {
        if (props.projectId) {
            dispatch(showAndHideSpinner(true))
            Pro0101Service.getInstance().getProjectById(props.projectId)
                .then(resp => {
                    if (resp.data.status) {
                        let dto = resp.data.responseData;
                        setProjectDto(dto)
                    } else {
                        toast.error("Get project fail !")
                    }
                    dispatch(showAndHideSpinner(false))
                })
                .catch(error => {
                    dispatch(showAndHideSpinner(false))
                })
        }
    }, [props.projectId])

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
                Pro0101Service.getInstance().delete(projectDto.id)
                    .then(resp => {
                        if (resp.data.status) {
                            props.onClose(true)
                        } else {
                            toast.error("Delete fail")
                        }
                    })
                    .catch(error => {

                    })
            }
        })
    }

    const handleEdit = () => {
        props.onClose(false)
    }

    const bookmarkOrUnBookmark = () => {
        // dispatch(showAndHideSpinner(true))
        Pro0101Service.getInstance().bookmarkOrUnBookmark({ id: projectDto.id, isBookmark: projectDto.isBookmark })
            .then(resp => {
                if (resp.data.status) {
                    let dto = structuredClone(projectDto);
                    dto.isBookmark = projectDto.isBookmark === "Y" ? "N" : "Y";
                    setProjectDto(dto);
                    props.refreshItems({ id: dto.id, isBookmark: dto.isBookmark })
                }
                // dispatch(showAndHideSpinner(false))
            })
            .catch(error => {
                // dispatch(showAndHideSpinner(false))
            })
    }

    return (
        <Fragment>
            <h1 className="modal-tit">{projectDto?.title}</h1>
            <div className="modal-content-area">
                <div className="modal-announce-wrap">
                    <div className="board-lst view-type-single">
                        <div className="info-wrap">
                            <span className="user-thumb">
                                <img src={projectDto?.imageUrl || ""} alt="예시이미지" onError={(event: any) => {
                                    event.target.src = "../../../assets/images/users/user-dummy-img.jpg"
                                }} />
                            </span>
                            <span className="user-name">{projectDto?.createdByNm}</span>
                            <span className="date">{projectDto?.createdDate ? dayjs(projectDto?.createdDate).format("YYYY-MM-DD HH:mm") : ''}</span>
                        </div>
                        <div className="utility">
                            {
                                (userInfo?.rolesStr || "").includes(AuthConstant.ROLE_ADMIN) ? (<button className="more" onClick={() => {
                                    setOpenAction(true)
                                }}></button>) : <Fragment />
                            }
                            <div className={`context-menu ${openAction ? 'active' : ''}`}>
                                <button className="edit" onClick={handleEdit}>Edit</button>
                                <button className="delete" onClick={handleDelete}>Delete</button>
                            </div>
                            <button onClick={bookmarkOrUnBookmark} className={`bookmark ${projectDto?.isBookmark == 'Y' ? "active" : ""}`}></button>

                        </div>

                        <div className="board-body markdown-body" style={{ padding: '1.3rem 0' }}>
                            {
                                (projectDto?.uri != undefined && (projectDto?.uri.startsWith("http://") || projectDto?.uri.startsWith("https://"))) && <button className="btn2" style={{ marginBottom: '1rem' }} onClick={() => {
                                    window.open(projectDto.uri, "_blank");
                                }}>Move to project repository</button>
                            }
                            <div dangerouslySetInnerHTML={{ __html: CommonUtil.convertMarkdownToHtml(projectDto?.description || "") }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
