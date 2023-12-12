import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';


type Sam0108Model = {
    zipCode: any,
    address: any,
    // address2: any
}

export default function Sam0108W(props: any) {

    const { t, i18n } = useTranslation();

    const [model, setModel] = useState<Sam0108Model>(props.data)

    const openDaumPostcode = () => {
        (window as any).openDaumPostcode()
    }

    // useEffect(() => {
    //     document.getElementById('zipCode')?.addEventListener("change", () => handleChange);

    // }, []);

    const handleChange = (event: any) => {
        setModel({
            ...model,
            [event.target.name]: event.target.value
        });
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        model.zipCode = $("#zipCode").val()
        model.address = $("#address").val();
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

    function chk(params: Sam0108Model) {
        let _chk = true;
        if (!_chk) {
            setModel((prveState: Sam0108Model) => {
                return {
                    ...prveState,
                    zipCode: prveState.zipCode === "" ? null : prveState.zipCode,
                    address: prveState.address === "" ? null : prveState.address,
                };
            });
        }
        return _chk;
    }

    const _save = () => {
        props.onClose(true);
        // console.log('value', model);
    }

    return (
        <>
            {/* <ToastContainer></ToastContainer> */}
            <form onSubmit={handleSave}>

                <div className='col-lg-12 mb-3'>
                    <label htmlFor="zipCode" className='form-label'>{t("same0106.label.zipCode")}</label>
                    <div className='row'>
                        <div className='d-flex col-lg-6 col-sm-12 col-12'>
                            <input value={model.zipCode || ""} className="form-control" name='zipCode' id='zipCode' placeholder={`${t("same0106.label.zipCode")}`} disabled />
                            <button type='button' onClick={openDaumPostcode} className="btn btn-info btn-rounded rounded-pill btn-forth waves-effect waves-light" style={{ marginLeft: "10px" }}>
                                <i className=" ri-search-line label-icon align-middle rounded-pill fs-16"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-lg-12 mb-3'>
                    <label htmlFor="address" className='form-label'>{t("sys0301.table.header.address")}</label>
                    <div className='row'>
                        <div className='d-flex col-lg-6 col-sm-12 col-12'>
                            <input value={model.address || ""} className="form-control" name='address' id='address' placeholder={`${t("sys0301.table.header.address")}`} disabled />
                        </div>
                    </div>
                </div>
                {/* <div className='col-lg-12 mb-3'>
                    <label htmlFor="address2" className='form-label'>Address2</label>
                    <div className='row'>
                        <div className='d-flex col-lg-6 col-sm-12 col-12'>
                            <input value={model.address2 || ""} className="form-control" name='address2' id='address2' onChange={handleChange} />
                        </div>
                    </div>
                </div> */}

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
