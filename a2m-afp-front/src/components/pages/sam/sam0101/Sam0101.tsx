import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { toast, ToastContainer } from 'react-toastify'
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
// import EditIcon from '@mui/icons-material/Edit';
import '../sam.css'
import { useAppDispatch, useAppSelector } from '../../../../store/hook'
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice'
import { Sam0101Service } from '../../../../services/sam/Sam0101Service'
import { Constant } from '../../../../constants/constant'
import { VariablesConstant } from '../../../../constants/variables'
import { CommonUtil } from '../../../../utils/commonUtil'
import AppDialog from '../../../commons/AppDialog'
import Sam0101W from './form/Sam0101W'
import AppSelect from '../../../commons/AppSelect'
import AppDatePicker from '../../../commons/AppDatePicker'
import AppFilter from '../../../commons/AppFilter'
import AppPagination from '../../../commons/AppPagination'
import FooterHashTag from '../common/FooterHashTag'
import { SplitButton } from 'primereact/splitbutton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
import CKServerUploaderPlugin from '../../../../utils/CKServerUploaderPlugin';

export class Sam0101Search {
    title: string;
    category: string;
    topic: string;
    date: string;
    page: number;
    limit: number;
    time: number;
    columnName: string;
    sortType: string;
    constructor(title: string, category: string, topic: string,
        date: string, page: number, limit: number, time: number, columnName: string, sortType: string) {
        this.title = title;
        this.category = category;
        this.topic = topic;
        this.date = date;
        this.page = page;
        this.limit = limit;
        this.time = time;
        this.columnName = columnName;
        this.sortType = sortType;
    }
}

export default function Sam0101() {

    const [openDialog, setOpen] = useState(false)

    const menus = useAppSelector(state => state.menus.menus)
    const dispatch = useAppDispatch();

    const location = useLocation()

    const [isMobile, setIsMobile] = useState(false)

    const currentMenu = useMemo(() => {
        for (let i = 0; i < menus.length; i++) {
            if (menus[i]['url'] != "" && menus[i]['url'] === location.pathname) {
                return menus[i];
            }
        }
    }, [menus])

    const [category, setCategory] = useState<any>([])
    const [topic, setTopic] = useState<any>([])
    const [topicSearch, setTopicSearch] = useState<any>([{ label: "All", value: "null", labelKr: "모두" }])


    useEffect(() => {
        // dispatch(showAndHideSpinner(true))
        Sam0101Service.getInstance().getListTccoStd({ upCommCd: Constant.CATEGORY })
            .then(async resp => {
                if (resp.data.status) {
                    let temp: any = [{ label: "All", value: "null", labelKr: "모두" }]
                    let tempTopic: any = [{ label: "All", value: "null", labelKr: "모두" }]
                    for (let step = 0; step < resp.data.responseData.length; step++) {
                        let item = resp.data.responseData[step];
                        temp.push({
                            label: item['commNmEn'],
                            value: item['commCd'],
                            labelKr: item['commNm']
                        })

                        await Sam0101Service.getInstance().getListTccoStd({ upCommCd: item['commCd'] })
                            .then(respChild => {
                                if (respChild.data.status) {
                                    for (let stepChild = 0; stepChild < respChild.data.responseData.length; stepChild++) {
                                        let itemTopic = respChild.data.responseData[stepChild];
                                        tempTopic.push({
                                            label: itemTopic['commNmEn'],
                                            value: itemTopic['commCd'],
                                            labelKr: itemTopic['commNm'],
                                            category: item['commCd']
                                        })
                                    }
                                }
                            })
                            .catch(error => {

                            })

                    }
                    setCategory(temp)
                    setTopic(tempTopic)
                }
                // dispatch(showAndHideSpinner(false))
            })
            .catch(error => {
                toast.error("Server error !!!")
                // dispatch(showAndHideSpinner(false))
            })
    }, [])

    const { t, i18n } = useTranslation()

    const jobs: any[] = VariablesConstant.SAMPLE

    const gender: any[] = VariablesConstant.GENDER

    const hanldeAdd = () => {
        setData(
            {
                title: null,
                phone: null,
                email: null,
                content: "",
                date: "",
                category: null,
                topic: null,
                checkbox: false,
                switchInput: false,
                status: "Y",
                fromDate: "",
                toDate: ""
            }
        )
        setOpen(true)
    }

    const closeDialog = (data?: any) => {
        setOpen(false)
        if (data) {
            _getList()
        }
    }

    const [data, setData] = useState({})

    const [list, setList] = useState([])

    const limit = Constant.ROWS_OF_PAGE;

    const [modelSearch, setModelSearch] = useState<Sam0101Search>(new Sam0101Search("", "null", "null", "", 1, limit, 0, "null", ""))

    const totalPage = useRef(1)

    useEffect(() => {
        _getList()
        handleResize()
        window.addEventListener("resize", handleResize)
    }, [modelSearch.page, modelSearch.date, modelSearch.time, modelSearch.category, modelSearch.topic])

    const editData = (obj: any) => {
        setData(obj)
        setOpen(true)
    }

    const deleteItem = (id: number) => {
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
                _delete(id)
            }
        })
    }

    function _delete(id: number) {

        Sam0101Service.getInstance().delete(id).then((resp) => {
            if (resp.status == HttpStatusCode.Ok) {
                if (resp.data.status) {
                    toast.success(resp.data.message)
                    _getList()
                } else {
                    toast.error(resp.data.message)
                }
            } else {
                toast.error(resp.statusText)
            }
        }).catch((error) => {
            toast.error("Server error !!!")
        })
    }

    function _getList() {
        dispatch(showAndHideSpinner(true))
        Sam0101Service.getInstance().getList(modelSearch).then((resp) => {
            if (resp.status == HttpStatusCode.Ok) {
                if (resp.data.status) {
                    const data = resp.data.responseData.value;
                    // totalPage.current = Math.ceil(resp.data.responseData.totalElement / modelSearch.limit)
                    totalPage.current = resp.data.responseData.totalElement
                    setList(data)
                } else {
                    toast.error(resp.data.message)
                }
            } else {
                toast.error(resp.statusText)
            }
            dispatch(showAndHideSpinner(false))
        }).catch((error) => {
            toast.error("Server error !!!")
            dispatch(showAndHideSpinner(false))
        })
    }

    const changePage = (page: number) => {
        setModelSearch(
            {
                ...modelSearch, page: page
            }
        )
    }

    const handleChangeSearch = (data: any, type: string) => {
        if (type === 'category') {
            setModelSearch({
                ...modelSearch, category: data, page: 1, topic: "null"
            })

            const temp = topic?.filter((e: any) => e.category == data || e.value === 'null')
            setTopicSearch(temp)
        } else {
            setModelSearch({
                ...modelSearch, topic: data, page: 1
            })
        }
    }

    const handleChangeDateSearch = (data: any) => {
        setModelSearch({
            ...modelSearch, date: dayjs(data).format("YYYY-MM-DD"), page: 1
        })
    }

    const handleChangeInput = (event: any) => {
        setModelSearch({
            ...modelSearch,
            title: event.target.value
        })
    }

    const search = () => {
        setModelSearch({
            ...modelSearch, page: 1, time: new Date().getTime()
        })
    }

    const reset = () => {
        setModelSearch({
            ...(new Sam0101Search("", "null", "null", "", 1, limit, new Date().getTime(), "null", ""))
        })
    }

    const lang = localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA

    const translate = useCallback((item: any, jobs: any) => {
        return CommonUtil.translate(jobs, item, lang)
    }, [lang])

    const translateTitleDialog = useCallback((item: any) => {
        if (!item) {
            return "";
        }
        if (Constant.SOUTH_KOREA === lang) {
            return item.menuNm
        } else if (Constant.ENGLISH === lang) {
            return item.menuNmEn
        }
    }, [lang])

    const nameColumn = [
        { label: "All", value: "null", labelKr: "모두" },
        { label: "Title", value: "TITLE", labelKr: "제목" },
        { label: "Created date", value: "CREATED_DATE", labelKr: "만든 날짜" }
    ]

    const handleChangeFilter = (data: any) => {

        setModelSearch({
            ...modelSearch,
            columnName: data['nameColumn'],
            sortType: data['sortType'],
            time: new Date().getTime(),
            page: 1
        })
    }

    //item button
    const items = [
        {
            label: `${t('sample.label.button.edit')}`,
            icon: 'pi pi-file-edit',
            command: () => {
                //function edit
            }

        },
        {
            label: `${t('sample.label.button.delete')}`,
            icon: 'pi pi-times',
            command: () => {
                //function delete
            }
        },
        {
            label: `${t('sample.label.button.confirm')}`,
            icon: 'pi pi pi-check',
            command: () => {
                //function confirm
            }
        },
        {
            label: `${t('sample.label.button.sample')}`,
            icon: 'pi pi-copy',
            command: () => {
                //function sample
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

    // const Markdown = useCallback((editor: any) => {
    //     editor.data.processor = new GFMDataProcessor(editor.data.viewDocument)
    // }, [])

    const editorConfig = {
        extraPlugins: [CKServerUploaderPlugin]
        // toolbar: [Markdown]
    };

    // create an event listener
    // useEffect(() => {
    //     window.addEventListener("resize", handleResize)
    // })

    return (
        <>
            <ToastContainer></ToastContainer>
            <AppDialog open={openDialog} className="sam-width-dialog" onClose={closeDialog} title={translateTitleDialog(currentMenu)}>
                <Sam0101W onClose={closeDialog} data={data} />
            </AppDialog>
            <div className="card search-area">
                <div className="card-body">
                    {/* <div className='d-flex justify-content-between mb-3'>
                            <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">{t('sample.label.search')}</h2>
                    </div> */}

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <div className='d-flex justify-content-between'>
                                    <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">{t('sample.label.search')}</h2>
                                </div>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#default-accordion-example">
                            <div className="accordion-body">
                                <div className='row mb-3'>
                                    <div className='col-xl-10 col-12 col-sm-12'>
                                        <div className='row'>
                                            <div className='search-el col-xl-3 col-12 col-sm-12'>
                                                <label className="form-label">{t('sample.label.category')}</label>
                                                <AppSelect dataSource={category} onChange={(event) => { handleChangeSearch(event, 'category') }} value={modelSearch.category} />
                                            </div>
                                            <div className='search-el col-xl-3 col-12 col-sm-12'>
                                                <label className="form-label">{t('sample.label.topic')}</label>
                                                <AppSelect dataSource={topicSearch} onChange={(event) => { handleChangeSearch(event, 'topic') }} value={modelSearch.topic} />
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='search-el col-xl-3 col-12 col-sm-12'>
                                                <label className='form-label'>{t('sample.label.input')}</label>
                                                <input value={modelSearch.title} className={`form-control`} name='title' onChange={handleChangeInput} onKeyUp={(e: any) => {
                                                    if (e.key === 'Enter') search()
                                                }} />
                                            </div>

                                            <div className='search-el col-xl-3 col-12 col-sm-12'>
                                                <label className="form-label">{t('sample.label.date')}</label>
                                                <AppDatePicker onChange={handleChangeDateSearch} value={modelSearch.date} />
                                            </div>
                                            <div className='search-el col-xl-6 col-12 col-sm-12'>
                                                <label className="form-label">Sort</label>
                                                <AppFilter value={modelSearch.columnName} nameColumn={nameColumn} onChange={handleChangeFilter} />
                                            </div>
                                            {/* <div className='col-xl-6 col-12 col-sm-12'>
                                    <label className="form-label">Sort</label>
                                    <AppFilter value={modelSearch.columnName} nameColumn={nameColumn} onChange={handleChangeFilter} />
                                </div> */}
                                        </div>

                                    </div>
                                    <div className='col-xl-2 col-12 col-sm-12 area-btn-search'>
                                        <div>
                                            <button type="button" className="btn btn-label rounded-pill btn-forth waves-effect waves-light" onClick={search}><i className="ri-search-2-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.search')}</button>
                                            <button type="button" className="btn btn-light btn-label rounded-pill waves-effect waves-light ms-3" onClick={reset}><i className="ri-refresh-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.reset')}</button>
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
                            {isMobile ? (
                                <div>
                                    <SplitButton label={`${t('sample.label.button.add')}`} className='rounded-btn' icon="pi pi-plus" onClick={hanldeAdd} model={items} />
                                </div>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary btn-label rounded-pill waves-effect waves-light" onClick={hanldeAdd}><i className="ri-file-add-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.button.add')}</button>
                                    <button type="button" className="btn btn-secondary btn-label rounded-pill waves-effect waves-light" ><i className="ri-edit-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.button.edit')}</button>
                                    <button type="button" className="btn btn-third btn-label rounded-pill waves-effect waves-light" ><i className="ri-delete-bin-6-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.button.delete')}</button>
                                    <button type="button" className="btn btn-forth btn-label rounded-pill waves-effect waves-light" ><i className="mdi mdi-check label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.button.confirm')}</button>
                                    <button type="button" className="btn btn-fifth btn-label rounded-pill waves-effect waves-light" ><i className="ri-file-copy-line label-icon align-middle rounded-pill fs-16 me-2"></i> {t('sample.label.button.sample')}</button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='table-responsive'>

                        <table className="table table-hover mb-3">
                            <thead className='table-light'>
                                <tr>
                                    <th scope="col">{t('sample.table.header.no')}</th>
                                    <th scope="col">{t('sample.label.category')}</th>
                                    <th scope="col">{t('sample.table.header.topic')}</th>
                                    <th scope="col">{t('sample.table.header.input')}</th>

                                    {/* <th scope="col" style={{ width: '30%' }}>{t('sample.table.header.textarea')}</th> */}
                                    <th scope="col">{t('sample.table.header.date')}</th>
                                    {/* <th scope="col">{t('sample.table.header.checkbox')}</th> */}
                                    {/* <th scope="col">{t('sample.table.header.switch')}</th> */}
                                    <th scope="col">{t('sample.table.header.gender')}</th>
                                    <th scope="col">{t('same0103.table.header.createdBy')}</th>
                                    <th scope="col">{t('sample.table.header.email')}</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map((element: any, index: number) => (
                                        <tr key={element.id} className="cus-cursor">
                                            {/* <td>{(modelSearch.page - 1) * limit + index + 1}</td> */}
                                            <td>{(totalPage.current - (modelSearch.page - 1) * limit) - index}</td>
                                            <td>{translate(element.category, category)}</td>
                                            <td>{translate(element.topic, topic)}</td>
                                            <td>{element.title}</td>

                                            {/* <td>{CommonUtil.setMaxLengthContent(element.textarea, 200)}</td> */}
                                            <td>{dayjs(element.date).format("YYYY-MM-DD")}</td>
                                            {/* <td>{element.checkbox ? "true" : "false"}</td> */}
                                            {/* <td>{element.switchInput ? "true" : "false"}</td> */}
                                            <td>{translate(element.status, gender)}</td>
                                            <td>{element.createdByNm}</td>
                                            <td>{element.email}</td>
                                            <td>
                                                {/* <IconButton aria-label="edit" onClick={() => editData(element)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => deleteItem(element.id)}>
                                                    <DeleteIcon />
                                                </IconButton> */}

                                                <i className="icon ri-edit-2-fill" onClick={() => editData(element)}></i>
                                                <i className="icon ri-delete-bin-2-fill ps-2" onClick={() => deleteItem(element.id)}></i>

                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='d-flex justify-content-end'>
                        {
                            list.length > 0 && <AppPagination page={modelSearch.page} rows={limit} onChange={changePage} count={totalPage.current} />
                        }
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-body'>
                    <CKEditor
                        editor={DecoupledEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={(editor: any) => {
                            editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                            );
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // console.log(data);
                            // console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            // console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            // console.log('Focus.', editor);
                        }}
                        config={editorConfig}
                    />
                </div>
            </div>
            <FooterHashTag />
        </>
    )
}
