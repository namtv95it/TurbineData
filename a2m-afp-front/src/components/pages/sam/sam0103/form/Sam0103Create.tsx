import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Editor } from "primereact/editor";
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import { HttpStatusCode } from 'axios';
import { Sam0103Service } from '../../../../../services/sam/Sam0103Service';
import AppSelect from '../../../../commons/AppSelect';

export class Sam0103Model {
    title: any
    content: any
    date: any
    category: any
    topic: any
}

export default function Sam0103Create(props: any) {

    const { t, i18n } = useTranslation()

    const [category, setCategory] = useState<any>(props.dataSourceCategory)
    const [topic, setTopic] = useState<any>(props.dataSourceTopic)

    const [model, setModel] = useState<Sam0103Model>({
        ...new Sam0103Model(), category: props.category, topic: props.topic
    })

    const handleChangeSelect = (event?: any, type?: any) => {
        if (type === 'category') {
            setModel({
                ...model,
                category: event,
                topic: null
            })
        } else {
            setModel({
                ...model,
                topic: event
            })
        }
    }

    const handleChange = (event: any) => {
        setModel({
            ...model,
            [event.target.name]: event.target.value
        })
    }

    const save = () => {
        if (chk(model)) {
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
                    _save()
                }
            })
        }
    }

    function _save() {
        Sam0103Service.getInstance().saveQuestion(model).then((resp) => {
            if (resp.status == HttpStatusCode.Ok) {
                if (resp.data.status) {
                    toast.success(resp.data.message)
                    props.onClose(true)
                } else {
                    toast.error(resp.data.message)
                }
            } else {
                toast.error(resp.statusText)
            }
        }).catch((error) => {
            toast.error(error)
        })
    }

    function chk(params: Sam0103Model) {
        let _chk = true;
        if (params.category == null || params.category === "null" || params.category == undefined) {
            toast.error(`${t('sam0101w.required.message.category')}`)
            _chk = false;
        } else if (params.topic == null || params.topic === "null" || params.topic == undefined) {
            toast.error(`${t('sam0101w.required.message.job')}`)
            _chk = false;
        } else if (params.title == null || params.title.trim() === "" || params.title == undefined) {
            toast.error(`${t('sam0101w.required.message.input')}`)
            _chk = false;
        } else if (content == null || content.trim() === "" || content == undefined) {
            toast.error(`${t('sam0101w.required.message.input')}`)
            _chk = false;
        }
        if (!_chk) {
            setModel((prveState: Sam0103Model) => {
                return {
                    ...prveState,
                    title: prveState.title || "",
                }
            })
            setContent(null)
        }
        return _chk;
    }

    const [content, setContent] = useState<any>('');

    const handleChangeEditor = (htmlValue: any) => {
        setContent(htmlValue)
    }

    useEffect(() => {
        setModel({
            ...model,
            content: content
        })
    }, [content])

    return (
        <>
            <ToastContainer></ToastContainer>

            <div>
                <div className='row mb-3'>
                    <div className='col-lg-6 col-12'>
                        <label className="form-check-label-radio">{t('sample.label.category')} <strong className='strong-required'>*</strong></label>
                        <AppSelect disabled={true} dataSource={category} onChange={(event) => { handleChangeSelect(event, 'category') }} value={model.category} />
                        <div className={`${model.category === "null" ? 'error-required' : 'display-none'}`}>
                            {t('sam0101w.required.message.category')}
                        </div>
                    </div>
                    <div className='col-lg-6 col-12'>
                        <label className="form-check-label-radio">{t('sample.label.topic')} <strong className='strong-required'>*</strong></label>
                        <AppSelect disabled={true} dataSource={topic} onChange={(event) => { handleChangeSelect(event, 'topic') }} value={model.topic} />
                        <div className={`${model.topic === "null" ? 'error-required' : 'display-none'}`}>
                            {t('sam0101w.required.message.job')}
                        </div>
                    </div>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'>{t('sample.label.input')} <strong className='strong-required'>*</strong></label>
                    <input value={model.title || ""} className="form-control" name='title' id='validationInput' onChange={handleChange} />
                    <div className={`${model.title?.trim() === "" ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.input')}
                    </div>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationTextarea" className='form-label'>{t('sample.label.textarea')} <strong className='strong-required'>*</strong></label>
                    <Editor value={content} onTextChange={(e) => handleChangeEditor(e.htmlValue)} style={{ height: '320px' }} />
                    <div className={`${content === null ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.input')}
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <button type="button" className="btn btn-forth btn-label rounded-pill waves-effect waves-light" onClick={save}><i className="mdi mdi-check label-icon align-middle rounded-pill fs-16 me-2"></i> Save</button>
                    <button type='button' onClick={() => props.onClose(false)}
                        className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-2"><i className="ri-close-circle-line label-icon align-middle rounded-pill fs-16 me-2"></i>{t('confirm.button.cancel.text')}</button>
                </div>
            </div>
        </>
    )
}
