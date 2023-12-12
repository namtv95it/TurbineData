import React, { useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppDialog from '../../../commons/AppDialog';
import { Constant } from '../../../../constants/constant';
import { useAppSelector } from '../../../../store/hook';
import { useLocation } from 'react-router-dom';
import { CommonUtil } from '../../../../utils/commonUtil';
import Sam0108W from './form/Sam0108W';
import FooterHashTag from '../common/FooterHashTag';
import { SplitButton } from 'primereact/splitbutton';
declare var $: any;

export class Sam0108Search {
    zipCode: string;

    constructor(
        zipCode: string,

    ) {
        this.zipCode = zipCode;

    }
}

export default function Sam0108() {

    const { t, i18n } = useTranslation();

    const [openDialog, setOpen] = useState(false)

    const [modelSearch, setModelSearch] = useState<Sam0108Search>(new Sam0108Search(""))

    const [data, setData] = useState({})

    const handleChangeZipcode = (event: any) => {
        setModelSearch({
            ...modelSearch,
            zipCode: event.target.value
        })
    }

    const handlePressEnter = (event: any) => {
        setModelSearch({
            ...modelSearch,
            zipCode: event.target.value,
        });
        if (event.keyCode === 13) {
            search();
        }
    };

    const search = () => {
    };

    const reset = () => {
    };

    const hanldeAdd = () => {
        setData(
            {
                zipCode: null,
            }
        )
        setOpen(true)
    }

    const closeDialog = (data?: any) => {
        setOpen(false)
        if (data) {

        }
    }

    return (
        <>
            <AppDialog open={openDialog} className="width-dialog" onClose={closeDialog} title={`${t("sys0301.table.header.address")}`}>
                <Sam0108W onClose={closeDialog} data={data} />
            </AppDialog>
            <div className="card search-area">
                <div className="card-body">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                <div className="d-flex justify-content-between">
                                    <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">
                                        {t("sample.label.search")}
                                    </h2>
                                </div>
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#default-accordion-example"
                        >
                            <div className="accordion-body">
                                <div className="row mb-3">
                                    <div className="col-xl-8 col-12 col-lg-12 col-sm-12">
                                        <div className="row">
                                            <div className="search-el col-xl-4 col-12 col-lg-4 col-sm-12">
                                                <label className="form-label">
                                                    {t("same0106.label.zipCode")}
                                                </label>
                                                <input
                                                    value={modelSearch.zipCode}
                                                    className={`form-control`}
                                                    name="zipCode"
                                                    placeholder={`${t("same0106.label.zipCode")}`}
                                                    onChange={handleChangeZipcode}
                                                    onKeyDown={handlePressEnter}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-12 col-lg-12 col-sm-12 area-btn-search">
                                        <div className="area-btn-search">
                                            <button
                                                type="button"
                                                className="btn btn-info btn-label rounded-pill btn-forth waves-effect waves-light"
                                                onClick={search}
                                            >
                                                <i className="ri-search-2-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                                                {t("sample.label.search")}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-light btn-label rounded-pill waves-effect waves-light"
                                                onClick={reset}
                                            >
                                                <i className="ri-refresh-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                                                {t("sample.label.reset")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className='d-flex justify-content-between mb-3'>
                        <div className='title-head-body'>
                            <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">{t('sample.label.table.list')}</h2>
                        </div>

                        <div className='button-head-body'>
                            <button type="button" className="btn btn-primary btn-label rounded-pill waves-effect waves-light" onClick={hanldeAdd}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.button.add')}</button>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHashTag />
        </>
    );
}
