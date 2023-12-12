import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import AppDialog from '../../../commons/AppDialog';
import AppSelect from '../../../commons/AppSelect';
import Swal from 'sweetalert2';
import { HttpStatusCode } from 'axios';
import { Sys0401Service } from '../../../../services/sys/Sys0401Service';
import Sys0401Form from './form/Sys0401Form';
import { TreeTable, TreeTableExpandedKeysType, TreeTableSelectionEvent } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { Constant } from '../../../../constants/constant';
import { Tag } from 'primereact/tag';
import TreeNode from 'primereact/treenode';
import { SplitButton } from 'primereact/splitbutton';

export class Sys0401Search {
    commName: string;
    status: string;
    constructor(commName: string, status: string) {
        this.commName = commName;
        this.status = status;
    }
}
export class CommCodeModel {
    commCd?: string
    commNm?: string
    commNmEn?: string
    valueConfig?: string
    description?: string
    upCommCd?: string
    useYn?: string
    children?: CommCodeModel[];
};
export default function CommCode() {

    const { t, i18n } = useTranslation()

    const status: any[] = [
        { label: "All", value: "null", labelKr: "모두" },
        { label: "Active", value: "Y", labelKr: "활동적인" },
        { label: "Inactive", value: "N", labelKr: "비활성" },
    ]

    const [openDialog, setOpen] = useState(false)
    const [data, setData] = useState({})

    const [listCommCode, setListCommCode] = useState<any>([])

    const [formStatus, setFormStatus] = useState('')

    const [modelSearch, setModelSearch] = useState<Sys0401Search>(new Sys0401Search("", "null"))

    const [selectedCommCode, setSelectedCommCode] = useState<any>('')

    const [selectedNodeKey, setSelectedNodeKey] = useState<any>(null)

    const [isReset, setIsReset] = useState<any>(false)

    const [expandedKeys, setExpandedKeys] = useState<TreeTableExpandedKeysType>({ '0': true, '0-0': true });

    const [isMobile, setIsMobile] = useState(false)


    useEffect(() => {
        _getList()
        setSelectedCommCode('')
        setSelectedNodeKey(null)
        handleResize()
    }, [])

    const handleAdd = () => {
        setOpen(true);
    }

    useEffect(() => {
        if (isReset) {
            _getList()
            setIsReset(false);
        }
    }, [isReset])
    const handleChangeSearch = (data: any) => {
        setModelSearch({
            ...modelSearch, status: data
        })

    }


    const handleChangeInput = (event: any) => {
        setModelSearch({
            ...modelSearch,
            commName: event.target.value
        })
    }
    const search = () => {
        _getList();
    }

    function _getList() {
        // covert comm code to array in array format (comm code have array children comm code)
        Sys0401Service.getInstance().getList(modelSearch).then(response => {
            setListCommCode(convertCommCode(response.data.responseData))
        })

    }

    useEffect(() => {
        if (listCommCode.length > 0) {
            expandAll();
        }
    }, [listCommCode])

    const reset = () => {
        setIsReset(true);
        setModelSearch({
            ...(new Sys0401Search('', 'null'))
        }
        )
    }

    const closeDialog = (data?: any) => {
        setOpen(false)
        if (data) {
            _getList()
        }
    }

    function convertCommCode(dataSource: any[]) {
        let tem: any = {};
        dataSource.forEach(ele => {
            tem[ele.commCd] = ele;
            ele['data'] = ele
            ele['key'] = ele.commCd
            if (tem[ele.upCommCd]) {
                if (tem[ele.upCommCd].children) {
                    tem[ele.upCommCd].children.push(ele);
                }
                else {
                    tem[ele.upCommCd].children = [];
                    tem[ele.upCommCd].children.push(ele);
                }
            }
        })
        let results: any[] = []
        dataSource.forEach(ele => {
            if (ele.lev == 1) {
                results.push(ele);
            }
        })
        return results;
    }

    const handleOpenDialog = (commCode?: any, isCreate?: any) => {
        setOpen(true)
        setData({ commCode, isCreate })
        if (isCreate) {
            setFormStatus('C')
        } else {
            setFormStatus('U')
        }

    }

    const handleDeleteCommCode = (commCode: any) => {
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
                _deleteCommCode(commCode);
            }
        })
    }

    function _deleteCommCode(commCode: string) {
        Sys0401Service.getInstance().delete(commCode).then((result) => {
            if (result.status === HttpStatusCode.Ok) {
                if (result.data.status === true) {
                    toast.success(`${t('sys0401.message.success.save')}`)
                    _getList();
                    setSelectedCommCode('')
                } else {
                    toast.error(`${t('sys0401.message.error.save')}`)
                }
            } else {
                toast.error(`${t('sys0401.message.error.system')}`)
            }
        }).catch((error) => {
            toast.error(`${t('sys0401.message.error.system')}`)
        });
    }

    const onSelect = (event: any) => {
        setSelectedCommCode(event.node.data.commCd)
    }
    const onUnselect = (event: any) => {
        setSelectedCommCode('')
    }

    const statusBodyTemplate = (commcode: CommCodeModel) => {
        return <>
            <Tag className={commcode.useYn === 'Y' ? 'badge-status-active' : 'badge-status-inactive'} value={commcode.useYn === 'Y' ? `${t('sys0401.title.search.status.active')}` : `${t('sys0401.title.search.status.inactive')}`} rounded></Tag>
        </>;
    };


    function expandAll() {
        let _expandedKeys = {};

        for (let node of listCommCode) {
            expandNode(node, _expandedKeys);
        }

        setExpandedKeys(_expandedKeys);
    };

    const expandNode = (node: any, _expandedKeys: TreeTableExpandedKeysType) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    }

            //item button
            const items = [
                {
                    label: `${t('sys0401.title.button.subcommcd')}`,
                    icon: 'pi pi-plus-circle',
                    command: () => {
                        handleOpenDialog(selectedCommCode, true)
                    }
        
                },
                {
                    label: `${t('sys0401.title.button.edit')}`,
                    icon: 'pi pi-file-edit',
                    command: () => {
                        handleOpenDialog(selectedCommCode, false)
                    }
                },
                {
                    label: `${t('sys0401.title.button.delete')}`,
                    icon: 'pi pi-trash',
                    command: () => {
                        handleDeleteCommCode(selectedCommCode)
                    }
                }
            ];
        
            //choose the screen size 
            const handleResize = () => {
                if (window.innerWidth < 600) {
                    setIsMobile(true)
                } else {
                    setIsMobile(false)
                }
            }
        
            // create an event listener
            useEffect(() => {
                window.addEventListener("resize", handleResize)
            })
    

    return (
        <>
            <ToastContainer></ToastContainer>
            <AppDialog className="width-dialog"
                open={openDialog} width={{ maxWidth: 'sm', fullWidth: true }}
                onClose={closeDialog}
                title={formStatus === 'C' ? `${t('sys0401.title.dialog.add')}` : `${t('sys0401.title.dialog.edit')}`}
                >
                <Sys0401Form onClose={closeDialog} data={data} />
            </AppDialog>
            <div className="card">
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
                                    <div className="col-xl-10 col-12 col-sm-12">
                                        <div className="row">
                                            <div className="search-el col-xl-3 col-12 col-sm-12">
                                                <label className='form-label'>{t('sys0401.label.search.commNm')}</label>
                                                <input value={modelSearch.commName} className={`form-control`} name='input' placeholder={`${t('sys0401.label.search.commNm')}`} onChange={handleChangeInput} />
                                            </div>
                                            <div className="search-el col-xl-3 col-12 col-sm-12">
                                                <label className="form-label">{t('sys0401.label.search.status')}</label>
                                                <AppSelect dataSource={status} onChange={handleChangeSearch} value={modelSearch.status} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-12 col-sm-12 area-btn-search">
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-label rounded-pill btn-forth waves-effect waves-light"
                                                onClick={search}
                                            >
                                                <i className="ri-search-2-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                                                {t("sys0301.label.search")}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-3"
                                                onClick={reset}
                                            >
                                                <i className="ri-refresh-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                                                {t("sys0301.label.reset")}
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
                            <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">{t('sys0401.title.table.commCdMng')}</h2>
                        </div>
                        <div className='button-head-body'>
                            {
                                !isMobile ?
                                <button type="button" className="btn btn-primary btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog('', true)}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0401.tilte.button.add')}</button>
                                :
                                    selectedCommCode === '' ?
                                    <button type="button" className="btn btn-primary btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog('', true)}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0401.tilte.button.add')}</button>
                                    :<></>
                            }
                            {
                                selectedCommCode === '' ?
                                    <></>
                                    :
                                    <>
                                        {
                                            isMobile? <SplitButton label={`${t('sample.label.button.add')}`} icon="pi pi-plus" onClick={() => handleOpenDialog('', true)} model={items} />
                                            :
                                            <>
                                                <button type="button" className="btn btn-forth  btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog(selectedCommCode, true)}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0401.title.button.subcommcd')}</button>
                                                <button type="button" className="btn btn-secondary btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog(selectedCommCode, false)}><i className="ri-edit-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0401.title.button.edit')}</button>
                                                <button type="button" className="btn btn-danger btn-label rounded-pill waves-effect waves-light" onClick={() => handleDeleteCommCode(selectedCommCode)}><i className="ri-delete-bin-6-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0401.title.button.delete')}</button>
                                            </>
                                        }
                                        
                                    </>
                            }
                            {/* {
                                selectedCommCode === '' ?
                                    <></>
                                    :
                                    <>
                                        <button type="button" className="btn btn-forth  btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog(selectedCommCode, true)}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i>{t('sys0401.title.button.subcommcd')}</button>
                                        <button type="button" className="btn btn-secondary btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog(selectedCommCode, false)}><i className="ri-edit-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0401.title.button.edit')}</button>
                                        <button type="button" className="btn btn-danger btn-label rounded-pill waves-effect waves-light" onClick={() => handleDeleteCommCode(selectedCommCode)}><i className="ri-delete-bin-6-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0401.title.button.delete')}</button>
                                    </>
                            } */}
                        </div>
                    </div>

                    <div className='list-comm-code'>
                        <TreeTable value={listCommCode} scrollable scrollHeight="500px"
                            selectionMode="single" onSelect={onSelect} onUnselect={onUnselect}
                            selectionKeys={selectedNodeKey}
                            expandedKeys={expandedKeys}
                            onToggle={(e) => setExpandedKeys(e.value)}
                            onSelectionChange={(e: TreeTableSelectionEvent) => setSelectedNodeKey(e.value)} metaKeySelection={false}>
                            <Column style={{ width: '200px' }} field="commCd" header={`${t('sys0401.table.header.commCd')}`} expander></Column>
                            <Column style={{ width: '150px' }} field="commNm" header={`${t('sys0401.table.header.nameKr')}`}></Column>
                            <Column style={{ width: '150px' }} field="commNmEn" header={`${t('sys0401.table.header.nameEn')}`}></Column>
                            <Column style={{ width: '150px' }} field="description" header={`${t('sys0401.table.header.description')}`}></Column>
                            <Column style={{ width: '150px' }} field="valueConfig" header={`${t('sys0401.table.header.valueConf')}`}></Column>
                            <Column style={{ width: '100px' }} body={statusBodyTemplate} header={`${t('sys0401.table.header.status')}`}></Column>
                        </TreeTable>
                    </div>
                </div>
            </div>
        </>
    )
}