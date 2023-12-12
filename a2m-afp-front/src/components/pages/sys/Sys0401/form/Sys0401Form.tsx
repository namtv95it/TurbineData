import { HttpStatusCode } from 'axios';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { VariablesConstant } from '../../../../../constants/variables';
import { Sys0401Service } from '../../../../../services/sys/Sys0401Service';
import AppRadioButton from '../../../../commons/AppRadioButton'
import { CommCodeModel } from '../ComCode';


export default function Sys0101Form(props: any) {

    const { t, i18n } = useTranslation()

    const status: any[] = VariablesConstant.COMM_CD_STATUS


    const [commCode, setCommCode] = useState<CommCodeModel>(new CommCodeModel())


    useEffect(() => {
        if (props.data.isCreate) {
            setCommCode(
                {
                    ...commCode,
                    useYn: VariablesConstant.DEFAULT_COMM_CODE_STATUS,
                    upCommCd: props.data.commCode
                }

            )
        } else {
            _getCommCodeById(props.data.commCode)
        }

    }, [])

    function _getCommCodeById(commCode: string) {
        Sys0401Service.getInstance().getCommCodeById({ commCode: commCode }).then((res) => {
            if (res.status === HttpStatusCode.Ok) {
                setCommCode(res.data.responseData);
            } else {
                toast.error(res.statusText)
            }
        }).catch((error) => {
            toast.error(error)
        })

    }

    const changeRadioButton = (data?: any) => {
        setCommCode({
            ...commCode,
            useYn: data.value
        })
    }

    const handleChange = (event: any) => {
        setCommCode({
            ...commCode,
            [event.target.name]: event.target.value
        })
    }


    const handleSaveCommCode = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()


        if (chk(commCode)) {
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
        } else {

        }
    }

    function _save() {
        if (!commCode.commCd) {
            Sys0401Service.getInstance().insertCommCode(commCode).then((resp) => {
                if (resp.status === HttpStatusCode.Ok) {
                    if (resp.data.status === true) {
                        toast.success("Save comm code successfully")
                        props.onClose(true)
                    } else {
                        toast.error("Save comm code failed")
                    }
                } else {
                    toast.error("System error")
                }
            }).catch((error) => {
                toast.error("System error")
            })
        } else {
            Sys0401Service.getInstance().updateCommCode(commCode).then((resp) => {
                if (resp.status === HttpStatusCode.Ok) {
                    if (resp.data.status === true) {
                        toast.success("Save comm code successfully")
                        props.onClose(true)
                    } else {
                        toast.error("Save comm code failed")
                    }
                } else {
                    toast.error("System error")
                }
            }).catch((error) => {
                toast.error("System error")
            })
        }

    }

    function chk(params: CommCodeModel) {
        let _chk = true;
        if (params.commNm == null || params.commNm.trim() === "") {
            toast.error("Please enter a code name Kr")
            _chk = false;
        } else if (params.commNmEn == null || params.commNmEn.trim() === "") {
            toast.error("Please enter a code name En")
            _chk = false;
        }
        if (!_chk) {
            setCommCode((prveState: CommCodeModel) => {
                return {
                    ...prveState,
                    commNm: prveState.commNm || "",
                    commNmEn: prveState.commNmEn || "",
                    valueConfig: prveState.valueConfig || "",
                    description: prveState.description || "",
                    useYn: prveState.useYn || "",
                }
            })
        }

        return _chk;
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <form onSubmit={handleSaveCommCode}>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0401.form.label.commNmKr')} <strong className='strong-required'>*</strong></label>
                    <input value={commCode.commNm || ""} className="form-control" name='commNm' id='validationInput' onChange={handleChange} />
                    <div className={`${commCode.commNm?.trim() === "" ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.input')}
                    </div>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0401.form.label.commNmEn')} <strong className='strong-required'>*</strong></label>
                    <input value={commCode.commNmEn || ""} className="form-control" name='commNmEn' id='validationInput' onChange={handleChange} />
                    <div className={`${commCode.commNmEn?.trim() === "" ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.input')}
                    </div>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0401.form.label.valueConf')}</label>
                    <input value={commCode.valueConfig || ""} className="form-control" name='valueConfig' id='validationInput' onChange={handleChange} />
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0401.form.label.description')}</label>
                    <input value={commCode.description || ""} className="form-control" name='description' id='validationInput' onChange={handleChange} />
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0401.form.label.parent')}</label>
                    <input value={commCode.upCommCd || ""} className="form-control" name='upCommCode' disabled />
                </div>
                <div className='col-lg-12 mb-3'>
                    <label className="form-check-label-radio">{t('sys0401.table.header.status')} <strong className='strong-required'>*</strong></label>
                    <AppRadioButton dataSource={status} nameGroup="useYn" onChange={changeRadioButton} value={{ value: commCode.useYn === undefined ? '' : commCode.useYn }} />
                    <div className={`${commCode.useYn === undefined ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.gender')}
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <button type="submit"
                        className="btn btn-primary btn-label rounded-pill waves-effect waves-light"><i className="ri-save-line label-icon align-middle rounded-pill fs-16 me-2"></i>{t('confirm.button.save.text')}</button>
                    <button type='button' onClick={() => props.onClose(false)}
                        className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-2"><i className="ri-close-circle-line label-icon align-middle rounded-pill fs-16 me-2"></i>{t('confirm.button.cancel.text')}</button>
                </div>
            </form>
        </>
    )
}