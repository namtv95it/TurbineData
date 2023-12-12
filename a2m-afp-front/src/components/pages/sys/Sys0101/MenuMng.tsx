import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Sys0101Service } from '../../../../services/sys/Sys0101Service';
import AppDialog from '../../../commons/AppDialog';
import AppSelect from '../../../commons/AppSelect';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
import Sys0101Form from './form/Sys0101Form';
import Swal from 'sweetalert2';
import { TreeTable, TreeTableExpandedKeysType, TreeTableSelectionEvent } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { HttpStatusCode } from 'axios';
import "./Sys0101.css";
import { Badge } from 'primereact/badge';
import { Constant } from '../../../../constants/constant';
import { WebSocketService } from '../../../../services/WebSocketService';
import { FirebaseService } from '../../../../services/FirebaseService';
import { Tag } from 'primereact/tag';
import { SplitButton } from 'primereact/splitbutton';
export class Sys0101Search {
    menuName: string;
    status: string;
    constructor(menuName: string, status: string) {
        this.menuName = menuName;
        this.status = status;
    }
}
export class Menu {
    menuId?: string;
    menuNm?: string;
    menuNmEn?: string;
    menuNmVi?: string;
    url?: string;
    upMenuId?: string;
    ordNo?: string;
    useYn?: any;
    description?: string;
    children?: Menu[];
    // constructor(menuId: string, menuNm: string, menuNmEn: string, menuNmVi: string, url: string, upMenuId: string, useYn: string,description: string, children?: Menu[]){
    //     this.menuId = menuId;
    //     this.children = children
    //     this.upMenuId = upMenuId;
    //     this.menuNm = menuNm;
    //     this.menuNmEn = menuNmEn;
    //     this.menuNmVi = menuNmVi;
    //     this.url = url;
    //     this.description = description;
    //     this.useYn = useYn;
    // }
};
export default function MenuMng() {

    const { t, i18n } = useTranslation()

    const status: any[] = [
        { label: "All", value: "null", labelKr: "모두" },
        { label: "Active", value: "Y", labelKr: "활동적인" },
        { label: "Inactive", value: "N", labelKr: "비활성" },
    ]

    const [openDialog, setOpen] = useState(false)
    const [data, setData] = useState({})

    const [listMenu, setListMenu] = useState<any>([])

    const [formStatus, setFormStatus] = useState('')

    const [modelSearch, setModelSearch] = useState<Sys0101Search>(new Sys0101Search("", "null"))

    const [selectedMenu, setSelectedMenu] = useState('')

    const [selectedNodeKey, setSelectedNodeKey] = useState<any>(null);

    const [isReset, setIsReset] = useState<any>(false)

    const [expandedKeys, setExpandedKeys] = useState<TreeTableExpandedKeysType>({ '0': true, '0-0': true });

    const [isMobile, setIsMobile] = useState(false)



    useEffect(() => {
        _getList()
        setSelectedMenu('')
        setSelectedNodeKey(null)

    }, [])

    const handleAdd = () => {
        setOpen(true);
    }

    const handleChangeSearch = (data: any) => {
        setModelSearch({
            ...modelSearch, status: data
        })
    }


    const handleChangeInput = (event: any) => {
        setModelSearch({
            ...modelSearch,
            menuName: event.target.value
        })
    }
    const search = () => {
        _getList();
    }

    function _getList() {
        // covert menu to array in array format (menu have array children menu)
        Sys0101Service.getInstance().getList(modelSearch).then(response => {
            setListMenu(convertMenu(response.data.responseData));
        })
    }
    useEffect(() => {
        if (isReset) {
            _getList()
            setIsReset(false);
        }
    }, [isReset])
    const reset = () => {
        setIsReset(true)
        setModelSearch({
            ...(new Sys0101Search('', 'null'))
        }
        )
    }

    const closeDialog = (data?: any) => {
        setOpen(false)
        if (data) {
            _getList()
        }
    }

    function convertMenu(dataSource: any[]) {
        let tem: any = {};
        dataSource.forEach(ele => {
            tem[ele.menuId] = ele;
            if (ele.url && ele.url != "") {
                ele.urlPath = ele.url
            }

            ele.name = ele.menuNm
            ele.nameI18n = {
                kr: ele.menuNm,
                en: ele.menuNmEn,
                vi: ele.menuNmVi
            };
            if (ele.urlPath) {
                ele.elementId = ele.urlPath.replace(/[\\\/]/gi, '')
                ele.elementSpanId = "span_" + ele.elementId;
            }
            ele['data'] = ele
            ele['key'] = ele.menuId

        })

        dataSource.forEach((ele) => {

        })

        dataSource.forEach(ele => {
            if (tem[ele.upMenuId]) {
                if (tem[ele.upMenuId].children) {
                    tem[ele.upMenuId].children.push(ele);
                }
                else {
                    tem[ele.upMenuId].children = [];
                    tem[ele.upMenuId].children.push(ele);
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

    const handleOpenDialog = (menuId?: any, isCreate?: any) => {
        setOpen(true)
        setData({ menuId, isCreate })
        if (isCreate) {
            setFormStatus('C')
        } else {
            setFormStatus('U')
        }

    }

    const handleDeleteMenu = (menuId: any) => {
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
                _deleteMenu(menuId);
            }
        })
    }

    function _deleteMenu(menuId: string) {
        Sys0101Service.getInstance().delete(menuId).then((result) => {
            if (result.status === HttpStatusCode.Ok) {
                if (result.data.status === true) {
                    toast.success(`${t('sys0101.message.response.deleteSuccess')}`)
                    _getList();
                    setSelectedMenu('')
                } else {
                    toast.error(`${t('sys0101.message.response.deleteFail')}`)
                }
            } else {
                toast.error(`${t('sys0101.message.response.error.system')}`)
            }
        }).catch((error) => {
            toast.error(`${t('sys0101.message.response.error.system')}`)
        });
    }

    const actionTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                {selectedMenu === '' ?

                    <></>
                    :
                    <>
                        {/* <IconButton aria-label="add">
                            <AddIcon onClick={() => handleOpenDialog(selectedMenu, true)} />
                        </IconButton>
                        <IconButton aria-label="edit">
                            <EditIcon onClick={() => handleOpenDialog(selectedMenu, false)} />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={() => handleDeleteMenu(selectedMenu)} />
                        </IconButton> */}
                    </>
                }


            </div>
        );
    };

    const onSelect = (event: any) => {
        setSelectedMenu(event.node.data.menuId)
    }
    const onUnselect = (event: any) => {
        setSelectedMenu('')
    }

    const statusBodyTemplate = (menu: Menu) => {
        return <>
            <Tag className={menu.useYn === 'Y' ? 'badge-status-active' : 'badge-status-inactive'} value={menu.useYn === 'Y' ? `${t('sys0101.title.status.active')}` : `${t('sys0101.title.status.inactive')}`} rounded></Tag>
        </>;
    };

    useEffect(() => {
        if (listMenu.length > 0) {
            expandAll();
        }
        handleResize()
    }, [listMenu])

    function expandAll() {
        let _expandedKeys = {};

        for (let node of listMenu) {
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
                label: `${t('sys0101.title.button.submenu')}`,
                icon: 'pi pi-plus-circle',
                command: () => {
                    handleOpenDialog(selectedMenu, true)
                }
    
            },
            {
                label: `${t('sys0101.title.button.edit')}`,
                icon: 'pi pi-file-edit',
                command: () => {
                    handleOpenDialog(selectedMenu, false)
                }
            },
            {
                label: `${t('sys0101.title.button.delete')}`,
                icon: 'pi pi-trash',
                command: () => {
                    handleDeleteMenu(selectedMenu)
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

    const testSendToBEWs = () => {
        WebSocketService.getInstance().send("test").then((response: any) => {
            // console.log(response);

        })
    }

    const pushNotice = () => {
        // Example list regis token to push notification
        const listRegisToken = [
            "fxdghKv9QPzxxk3hzHfjcy:APA91bE0kfryphPntg4mcIzm8OdARDALqSAMGgYsowMGMs3D3p9TT9N38DsoXNbFIFx9E6N33_KPjQq1mw-v7FlJpD-JcP5umbnQFBCq1ob7R3iVlHRlSqSD_2youZgqW2m0ULBG6GnL",
            "dOXo2MGCKJHcAAi0Anv7fo:APA91bGaMv3tSlyZi0YXAc0KLLigSUi9qmd6VlcH8w_GCDQwu0ylhUZ826QJBFTL0y9f9CMS9YsGlCB6daj3d3-C_28nAR72F1lkDxRrapWXwMxsYfysVu6jfNCU-oW8vSpaMwyLSUz4",
            "eEdJ2yxwSRDGfWI94CtFQ6:APA91bFs5qbAbgNn9J57lOcjP_LiwzvolZJW4fpOANvO8-0kM3Pm13OLkJxOSn4MpNpxMkq5ZSC4ltmWRYqv1qJXUbczzsZvIZe-3AVmVLOAK8LP9ex024BimMEaZqay1EP7RXTiqbRi",
            "fwD8UyDI-1GU000zaOHhdH:APA91bFjjgVHJZxqJDTYLmEyWEm1gH_cw2YQn3rNnSmKf8haWgNskquQ54s8msa9XK_uHuSROKTWLIRS6GE-e4DaZtcDljY93-wIxKnCKkFy1fnshmdQJgLsaueFBcOfjdpOoFmRhz8W",
            "fux68HeMGoYIlp8iVYr_SS:APA91bFJzkDDUv9suNWeCzdUyFT_LdSOPTVchJqEC-W2bXWclt7uUI_p_AzV6QYYkg-P1dMpVjZjwdD0e9ZhJjuPlKjn_aK6dWT9NuE2CTeT1ft7_HsDII8nLXRC4SHfQWrgXBuvVJNk",
            "eoDF3fNVknPi42X3QDDIlu:APA91bEuWYeKoa7NYQafiVJa42rhSx8B2CDY8_8HVJTmHou8D2pJU7qvCKRzYAGni-cG2ACVdd5gAr8pHGkyv74F0TNNmDaT8GxeymVBcPvBvmfhxkOJCxLWMFp8l6iSkJ50_nQR4-WK",
            "cY2gJN6A7pOx0KPhlhCu-X:APA91bFuyk0tO-SOgxqSDlXAbkmuT9CSVZ3kqdf6gOoKUaVfRnk4JeEAntiuVKGnh_w6iQGeJ2OcTSkLEtpiEF8OpYQnILCLKdRGEdktT7XFILw-Pbxy004Ynuy-TbXbqtHlSolSZ-bZ"
        ]
        FirebaseService.getInstance().push(listRegisToken).then(res => {
            // console.log(res);
        })
    }


    return (
        <>
            <ToastContainer></ToastContainer>
            <AppDialog className="width-dialog"
                open={openDialog} width={{ maxWidth: 'sm', fullWidth: true }}
                onClose={closeDialog} title={formStatus === 'C' ? `${t('sys0101.title.dialog.addMenu')}` : `${t('sys0101.title.dialog.editMenu')}`}
                >
                <Sys0101Form onClose={closeDialog} data={data} />
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
                                                <label className='form-label'>{t('sys0101.label.menuName')}</label>
                                                <input value={modelSearch.menuName} className={`form-control`} name='input' placeholder={`${t('sys0101.label.menuName')}`} onChange={handleChangeInput} />
                                            </div>
                                            <div className="search-el col-xl-3 col-12 col-sm-12">
                                                <label className="form-label">{t('sys0101.label.status')}</label>
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
                            <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">{t('sys0101.title.table.menuMng')}</h2>
                        </div>
                        <div className='button-head-body'>
                            {
                                !isMobile ?
                                <button type="button" className="btn btn-primary btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog('', true)}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.button.add')}</button>
                                :
                                    selectedMenu === '' ?
                                    <button type="button" className="btn btn-primary btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog('', true)}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.button.add')}</button>
                                    :<></>
                            }
                            {
                                selectedMenu === '' ?
                                    <></>
                                    :
                                    <>
                                        {
                                            isMobile? <SplitButton label={`${t('sample.label.button.add')}`} icon="pi pi-plus" onClick={() => handleOpenDialog('', true)} model={items} />
                                            :
                                            <>
                                                <button type="button" className="btn btn-forth  btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog(selectedMenu, true)}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0101.title.button.submenu')}</button>
                                                <button type="button" className="btn btn-secondary btn-label rounded-pill waves-effect waves-light" onClick={() => handleOpenDialog(selectedMenu, false)}><i className="ri-edit-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0101.title.button.edit')}</button>
                                                <button type="button" className="btn btn-danger btn-label rounded-pill waves-effect waves-light" onClick={() => handleDeleteMenu(selectedMenu)}><i className="ri-delete-bin-6-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sys0101.title.button.delete')}</button>
                                            </>
                                        }
                                        
                                    </>
                            }
                        </div>
                    </div>

                    <div className='list-menu'>
                        <TreeTable value={listMenu} scrollable scrollHeight="500px"
                            selectionMode="single" onSelect={onSelect} onUnselect={onUnselect}
                            selectionKeys={selectedNodeKey}
                            expandedKeys={expandedKeys}
                            onToggle={(e) => setExpandedKeys(e.value)}
                            onSelectionChange={(e: TreeTableSelectionEvent) => setSelectedNodeKey(e.value)} metaKeySelection={false}>
                            <Column style={{ width: '200px' }} field="menuId" header={`${t('sys0101.table.header.menuId')}`} expander></Column>
                            <Column style={{ width: '150px' }} field="menuNm" header={`${t('sys0101.table.header.menuNmKr')}`}></Column>
                            <Column style={{ width: '150px' }} field="menuNmEn" header={`${t('sys0101.table.header.menuNmEn')}`}></Column>
                            <Column style={{ width: '150px' }} field="url" header={`${t('sys0101.table.header.url')}`}></Column>
                            <Column style={{ width: '100px' }} field="ordNo" header={`${t('sys0101.table.header.ordNo')}`}></Column>
                            <Column style={{ width: '100px' }} body={statusBodyTemplate} header={`${t('sys0101.table.header.status')}`}></Column>
                        </TreeTable>
                    </div>
                </div>
            </div>
        </>
    )
}