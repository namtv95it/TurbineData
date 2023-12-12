import { HttpStatusCode } from 'axios';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { VariablesConstant } from '../../../../../constants/variables';
import { Sys0101Service } from '../../../../../services/sys/Sys0101Service';
import AppRadioButton from '../../../../commons/AppRadioButton'
import { Menu } from '../MenuMng';

export default function Sys0101Form(props: any) {

    

    const { t, i18n } = useTranslation()

    const status: any[] = VariablesConstant.MENU_STATUS


    const [model, setModel] = useState<Menu>(new Menu())

    
    
    
    useEffect(() => {            
        if(props.data.isCreate){
            // model.upMenuId = props.data.menuId
            // model.useYn = VariablesConstant.DEFAULT_MENU_STATUS
            setModel({
                ...model,
                useYn: VariablesConstant.DEFAULT_MENU_STATUS,
                upMenuId : props.data.menuId
            })
        }else{
            _getMenuById(props.data)
        }
        
    },[])

    

    function _getMenuById(menuId: string){
        Sys0101Service.getInstance().getMenuById(menuId).then((res)=>{            
            if (res.status === HttpStatusCode.Ok) {
                setModel(res.data.responseData);                
            } else {
                toast.error(`${t('sys0101.message.response.error.system')}`)
            }
        }).catch((error) => {
            toast.error(`${t('sys0101.message.response.error.system')}`)
        })
        
    }

    const changeRadioButton = (data?: any) => {
        setModel({
            ...model,
            useYn: data.value
        })
    }

    const handleChange = (event: any) => {        
        setModel({
            ...model,
            [event.target.name]: event.target.value
        })
    }


    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
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
        if(!model.menuId){

            // Insert new menu

            Sys0101Service.getInstance().insertMenu(model).then((resp) => {   
                if (resp.data.status === true) {                    
                    if(resp.data.responseData < 0) {
                        toast.error(`${t('sys0101.message.response.error.levelMax')}`)
                    }else{
                        toast.success(`${t('sys0101.message.response.success.saveMenu')}`)
                    }
                    props.onClose(true)
                }else{
                    toast.error(`${t('sys0101.message.response.error.saveMenu')}`)
                }
            }).catch((error) => {
                toast.error(`${t('sys0101.message.response.error.system')}`)
            })
        }else{
            
            // Update menu

            Sys0101Service.getInstance().updateMenu(model).then((resp) => {            
            if (resp.status === HttpStatusCode.Ok) {
                if (resp.data.status === true) {
                    toast.success(`${t('sys0101.message.response.success.saveMenu')}`)
                    props.onClose(true)
                }else{
                    toast.error(`${t('sys0101.message.response.error.saveMenu')}`)
                }
            } else {
                toast.error(`${t('sys0101.message.response.error.system')}`)
            }
        }).catch((error) => {
            toast.error(`${t('sys0101.message.response.error.system')}`)
        })
        }
        
    }

    function chk(params: Menu) {
        let _chk = true;
        if (params.menuNm == null || params.menuNm.trim() === "") {
            toast.error(`${t('sys0101.message.required.nameKr')}`)
            _chk = false;
        } else if (params.menuNmEn == null || params.menuNmEn.trim() === "") {
            toast.error(`${t('sys0101.message.required.nameEn')}`)
            _chk = false;
        } else if (params.menuNmVi == null || params.menuNmVi.trim() === "") {
            toast.error(`${t('sys0101.message.required.nameVi')}`)
            _chk = false;
        }else if ((params.ordNo == null || params.ordNo.toString().trim() === "") && model.menuId) {
            toast.error(`${t('sys0101.message.required.ordNo')}`)
            _chk = false;
        }
        if (!_chk) {
            setModel((prveState: Menu) => {
                return {
                    ...prveState,
                    menuNm: prveState.menuNm || "",
                    menuiNmEn: prveState.menuNmEn || "",
                    menuNmVi: prveState.menuNmVi || "",
                    ordNo: prveState.ordNo || "",
                    url: prveState.url || "",
                    useYn: prveState.useYn || "",
                }
            })
        }
        return _chk;
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <form onSubmit={handleSave}>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0101.tilte.form.menuNmKr')}<strong className='strong-required'>*</strong></label>
                    <input value={model.menuNm || ""} className="form-control" name='menuNm' id='validationInput' onChange={handleChange} />
                    <div className={`${model.menuNm?.trim() === "" ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.input')}
                    </div>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0101.tilte.form.menuNmEn')}<strong className='strong-required'>*</strong></label>
                    <input value={model.menuNmEn || ""} className="form-control" name='menuNmEn' id='validationInput' onChange={handleChange} />
                    <div className={`${model.menuNmEn?.trim() === "" ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.input')}
                    </div>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0101.tilte.form.menuNmVi')}<strong className='strong-required'>*</strong></label>
                    <input value={model.menuNmVi || ""} className="form-control" name='menuNmVi' id='validationInput' onChange={handleChange} />
                    <div className={`${model.menuNmVi?.trim() === "" ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.input')}
                    </div>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0101.tilte.form.url')}</label>
                    <input value={model.url || ""} className="form-control" name='url' id='validationInput' onChange={handleChange} />
                </div>
                { model.menuId?
                    <div className='col-lg-12 mb-3'>
                        <label htmlFor="validationInput" className='form-label'> {t('sys0101.table.header.ordNo')}<strong className='strong-required'>*</strong></label>
                        <input value={model.ordNo || ""} className="form-control" name='ordNo' id='validationInput' onChange={handleChange} />
                        <div className={`${model.ordNo?.toString().trim() === "" ? 'error-required' : 'display-none'}`}>
                            {t('sam0101w.required.message.input')}
                        </div>
                    </div>
                    :
                    <></>
                }
                
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0101.tilte.form.description')}</label>
                    <input value={model.description || ""} className="form-control" name='description' id='validationInput' onChange={handleChange} />
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInput" className='form-label'> {t('sys0101.tilte.form.parent')}</label>
                    <input value={model.upMenuId || ""} className="form-control" name='upmenuId' disabled/>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label className="form-check-label-radio">{t('sys0101.tilte.form.status')}<strong className='strong-required'>*</strong></label>
                    <AppRadioButton dataSource={status} nameGroup="useYn" onChange={changeRadioButton} value={ {value: model.useYn} } />
                    <div className={`${model.useYn === undefined ? 'error-required' : 'display-none'}`}>
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