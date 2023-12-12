import React, { useEffect, useState } from 'react'
import AppCKEditor from '../../commons/AppCKEditor'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { RequestNewLibService } from '../../../services/request/RequestNewLibService'

export default function RequestForm(props: any) {

    const { t, i18n } = useTranslation()

    const [request, setRequest] = useState<any>({
        // title: "",
        // description: ""
    })

    useEffect(() => {
        if (props.requestId) {
            RequestNewLibService.getInstance().getRequestById({ requestId: props.requestId }).then((response: any) => {
                setRequest({
                    ...request,
                    title: response.data.responseData.title,
                    description: response.data.responseData.description
                });
            })
        }

    }, [])

    useEffect(() => {
    }, [request])
    const handleChange = (event: any) => {
        setRequest({
            ...request,
            [event.target.name]: event.target.value
        })
    }
    const handleSave = () => {
        if (chk()) {
            Swal.fire({
                title: `${t('confirm.label.title')}`,
                text: `${t('confirm.label.message.save')}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#809bf1',
                cancelButtonColor: '#727379',
                confirmButtonText: `${t('confirm.button.yes.text')}`,
                cancelButtonText: `${t('confirm.button.no.text')}`
            }).then((result) => {
                if (result.value) {
                    if (props.requestId) {
                        const param = {
                            ...request,
                            requestId: props.requestId
                        }
                        RequestNewLibService.getInstance().updateRequest(param).then((response: any) => {
                            if (response.data.status === true) {
                                toast.success("Update request successfully")
                                props.onClose(response.data)
                            } else {
                                toast.error("Update request unsuccessfully")
                            }
                        }).catch((err) => {
                            toast.error("Update request unsuccessfully")
                        })
                    } else {
                        RequestNewLibService.getInstance().insertRequest(request).then((res: any) => {
                            if (res.data.status === true) {
                                toast.success("Added request successfully")
                                props.onClose(res.data)
                            } else {
                                toast.error("Added request unsuccessfully")
                            }
                        }).catch((err) => {
                            toast.error("Added request unsuccessfully")
                        })
                    }

                }
            })

        }
    }
    const chk = () => {
        let _chk = true
        if (request.title == "") {
            toast.error("Request title is not empty")
            _chk = false;
        } else if (request.description == "") {
            toast.error("Description is not empty")
            _chk = false;
        }
        return _chk;
    }

    const closeModal = () => {
        props.onClose(true)
    }

    return (
        <>
            <div className="modal-cont">
                <h1 className="modal-tit">{props.requestId ? "Edit request" : "New request"}</h1>
                <div className="modal-content-area">
                    <div className="input-group subject">
                        <label>
                            <input type="text" name="title" placeholder="제목을 입력하세요." value={request.title || ""} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="input-group">
                        <div className="new-announce-editor">
                            <AppCKEditor content={request.description} onChange={(data) => {
                                setRequest({
                                    ...request,
                                    description: data
                                })
                            }} />
                        </div>
                    </div>
                </div>

                <div className="modal-btn-wrap">
                    <button className="btn3" onClick={closeModal}>Cancel</button>
                    <button className="btn2" onClick={handleSave}>Save</button>
                </div>

            </div>
        </>
    )
}
