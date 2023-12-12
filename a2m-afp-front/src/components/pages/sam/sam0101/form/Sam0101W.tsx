
import axios, { HttpStatusCode } from 'axios';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { Constant } from '../../../../../constants/constant';
import { VariablesConstant } from '../../../../../constants/variables';
import { Sam0101Service } from '../../../../../services/sam/Sam0101Service';
import { HeadersUtil } from '../../../../../utils/headersUtil';
import { ValidationUtil } from '../../../../../utils/validationUtil';
import AppDatePicker from '../../../../commons/AppDatePicker';
import AppDateRange from '../../../../commons/AppDateRange';
import AppRadioButton from '../../../../commons/AppRadioButton';
import AppSelect from '../../../../commons/AppSelect';
import AppCKEditor from '../../../../commons/AppCKEditor';

type Sam0101Model = {
    title: string | null,
    phone: string | null,
    email: string | null,
    content: string,
    date: Date | null | "",
    category: string | null,
    topic: string | null,
    checkbox: boolean,
    switchInput: boolean,
    status: string,
    fromDate: Date | null | "",
    toDate: Date | null | ""
}

export default function Sam0101W(props: any) {

    const { t, i18n } = useTranslation()

    const gender: any[] = VariablesConstant.GENDER

    const [category, setCategory] = useState<any>([])
    const [topic, setTopic] = useState<any>([{ label: "All", value: "null", labelKr: "모두" }])

    const [model, setModel] = useState<Sam0101Model>(props.data)

    const changeRadioButton = (data?: any) => {
        setModel({
            ...model,
            status: data.value
        })
    }

    useEffect(() => {
        Sam0101Service.getInstance().getListTccoStd({ upCommCd: Constant.CATEGORY })
            .then(resp => {
                if (resp.data.status) {
                    let temp = [{ label: "All", value: "null", labelKr: "모두" }]
                    for (let step = 0; step < resp.data.responseData.length; step++) {
                        let item = resp.data.responseData[step];
                        temp.push({
                            label: item['commNmEn'],
                            value: item['commCd'],
                            labelKr: item['commNm']
                        })
                    }
                    setCategory(temp)
                }
            })
            .catch(error => {

            })
    }, [])

    const handleChangeCheckbox = (event: any) => {
        setModel({
            ...model,
            checkbox: event.target.checked
        })
    }

    const handleChangeSwitch = (event: any) => {
        setModel({
            ...model,
            switchInput: event.target.checked
        })
    }

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

    useEffect(() => {
        if (model.category && model.category != 'null') {
            Sam0101Service.getInstance().getListTccoStd({ upCommCd: model.category })
                .then(resp => {
                    if (resp.data.status) {
                        let temp = [{ label: "All", value: "null", labelKr: "모두" }]
                        for (let step = 0; step < resp.data.responseData.length; step++) {
                            let item = resp.data.responseData[step];
                            temp.push({
                                label: item['commNmEn'],
                                value: item['commCd'],
                                labelKr: item['commNm']
                            })
                        }
                        setTopic(temp)
                    }
                })
                .catch(error => {

                })
        }
    }, [model.category])

    const handleChange = (event: any) => {
        setModel({
            ...model,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeDate = (event: Date) => {
        setModel({
            ...model,
            date: event
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
        axios.post(process.env.REACT_APP_API_URL + "/sam/sam0101/save.do", model, {
            headers: HeadersUtil.getHeadersAuth()
        }).then((resp) => {
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

    function chk(params: Sam0101Model) {
        let _chk = true;

        if (params.category == null || params.category === "null") {
            toast.error(`${t('sam0101w.required.message.category')}`)
            _chk = false;
        } else if (params.topic == null || params.topic === "null") {
            toast.error(`${t('sam0101w.required.message.job')}`)
            _chk = false;
        } else if (params.title == null || params.title.trim() === "") {
            toast.error(`${t('sam0101w.required.message.input')}`)
            _chk = false;
        } else if (params.phone == null || params.phone.trim() === "") {
            toast.error(t('sam0101w.required.message.phone'))
            _chk = false;
        } else if (!ValidationUtil.isPhone(params.phone?.trim())) {
            toast.error(`${t('sam0101w.validate.message.phone')}`)
            _chk = false;
        } else if (params.email == null || params.email.trim() === "") {
            toast.error(`${t('sam0101w.required.message.email')}`)
            _chk = false;
        } else if (!ValidationUtil.isEmail(params.email?.trim())) {
            toast.error(t('sam0101w.validate.message.email'))
            _chk = false;
        } else if (params.date === null || model.date === "") {
            toast.error(`${t('sam0101w.required.message.date')}`)
            _chk = false;
        } else if (params.status === null) {
            toast.error(`${t('sam0101w.required.message.gender')}`)
            _chk = false;
        } else if (params.fromDate == undefined || params.fromDate === null || params.fromDate == "") {
            toast.error(`${t('sam0101w.required.message.date')}`)
            _chk = false;
        }
        if (!_chk) {
            setModel((prveState: Sam0101Model) => {
                return {
                    ...prveState,
                    title: prveState.title || "",
                    phone: prveState.phone || "",
                    email: prveState.email || "",
                    date: prveState.date === "" ? null : prveState.date,
                    category: prveState.category || "null",
                    topic: prveState.topic || "null",
                    status: prveState.status,
                    fromDate: prveState.fromDate == "" ? null : prveState.fromDate,
                    toDate: prveState.toDate == "" ? null : prveState.toDate
                }
            })
        }
        return _chk;
    }

    const handleChangeDatePickerRange = (data: any) => {
        setModel({
            ...model,
            fromDate: data.fromDate,
            toDate: data.toDate
        })
    }

    useEffect(() => {
        // console.log(model);
    }, [model.content])

    return (
        <>
            <form onSubmit={handleSave}>
                <div className='row mb-3'>
                    <div className='col-lg-6 col-sm-12 col-12'>
                        <label className="form-check-label-radio">{t('sample.label.category')} <strong className='strong-required'>*</strong></label>
                        <AppSelect dataSource={category} onChange={(event) => { handleChangeSelect(event, 'category') }} value={model.category == null ? "" : model.category} />
                        <div className={`${model.category === "null" ? 'error-required' : 'display-none'}`}>
                            {t('sam0101w.required.message.category')}
                        </div>
                    </div>
                    <div className='col-lg-6 col-sm-12 col-12'>
                        <label className="form-check-label-radio">{t('sample.label.topic')} <strong className='strong-required'>*</strong></label>
                        <AppSelect disabled={model.category === null || model.category === "null" ? true : false} dataSource={topic} onChange={(event) => { handleChangeSelect(event, 'topic') }} value={model.topic == null ? "" : model.topic} />
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
                    <label htmlFor="validationPhone" className='form-label'>{t('sample.label.phone')} <strong className='strong-required'>*</strong></label>
                    <input value={model.phone || ""} className="form-control" name='phone' id='validationPhone' onChange={handleChange} />
                    <div className={`${model.phone?.trim() === "" ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.phone')}
                    </div>
                    <div className={`${model.phone?.trim() != null && model.phone.trim() != "" && !ValidationUtil.isPhone(model.phone?.trim()) ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.validate.message.phone')}
                    </div>
                </div>

                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationInputEmail" className='form-label'>{t('sample.label.email')} <strong className='strong-required'>*</strong></label>
                    <input value={model.email || ""} className="form-control" name='email' id='validationInputEmail' onChange={handleChange} />
                    <div className={`${model.email?.trim() === "" ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.email')}
                    </div>
                    <div className={`${model.email?.trim() != null && model.email.trim() != "" && !ValidationUtil.isEmail(model.email?.trim()) ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.validate.message.email')}
                    </div>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="validationTextarea" className='form-label'>{t('sample.label.textarea')}</label>
                    <textarea value={model.content} className='form-control' name='content' id='validationTextarea' onChange={handleChange}></textarea>
                </div>
                <div className='row'>
                    <div className='col-lg-6 mb-3'>
                        <label className="form-check-label-radio">From date - To date <strong className='strong-required'>*</strong></label>
                        <AppDateRange fromDate={model.fromDate} toDate={model.toDate} onChange={handleChangeDatePickerRange} />
                        <div className={`${model.fromDate == null || model.toDate == null ? 'error-required' : 'display-none'}`}>
                            {t('sam0101w.required.message.date')}
                        </div>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-lg-6 col-sm-12 col-12'>
                        <label className="form-check-label-radio">{t('sample.label.date')} <strong className='strong-required'>*</strong></label>
                        <AppDatePicker onChange={handleChangeDate} value={model.date} />
                        <div className={`${model.date == null ? 'error-required' : 'display-none'}`}>
                            {t('sam0101w.required.message.date')}
                        </div>
                    </div>
                    <div className='col-lg-6 col-sm-12 col-12'>
                        <label className="form-check-label-radio">{t('sample.label.gender')} <strong className='strong-required'>*</strong></label>
                        <AppRadioButton dataSource={gender} nameGroup="gender" onChange={changeRadioButton} value={{ value: model.status }} isHorizontal={false} />
                        <div className={`${model.status === undefined ? 'error-required' : 'display-none'}`}>
                            {t('sam0101w.required.message.gender')}
                        </div>
                    </div>
                </div>
                {/* <div className='d-flex col-lg-12 mb-3'>
                    <div className='col-lg-6'>
                        <div className='form-check'>
                            <input checked={model.checkbox} type="checkbox" className='form-check-input' id='validationCheckboxForm' onChange={handleChangeCheckbox} />
                            <label htmlFor="validationCheckboxForm" className='form-label'>{t('sample.label.checkbox')}</label>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className="form-check form-switch" dir="ltr">
                            <input checked={model.switchInput} type="checkbox" className="form-check-input" id="customSwitchsizemdForm" onChange={handleChangeSwitch} />
                            <label className="form-check-label" htmlFor="customSwitchsizemdForm">{t('sample.label.switch')}</label>
                        </div>
                    </div>
                </div> */}
                <div className='col-lg-12 mb-3'>
                    {/* <label className="form-check-label-radio">{t('sample.label.gender')} <strong className='strong-required'>*</strong></label>
                    <AppRadioButton dataSource={gender} nameGroup="gender" onChange={changeRadioButton} value={{ value: model.gender }} />
                    <div className={`${model.gender === undefined ? 'error-required' : 'display-none'}`}>
                        {t('sam0101w.required.message.gender')}
                    </div> */}
                    <AppCKEditor content={model.content} onChange={(data: string) => {setModel({...model, content: data})}} />
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
