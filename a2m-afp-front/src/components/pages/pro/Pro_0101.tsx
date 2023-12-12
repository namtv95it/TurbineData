import React, { useEffect, useState } from 'react'
import { AfpTab } from '../../../utils/afp/tab';
import { AfpSubTs } from '../../../utils/afp/sub';
import { ProjectSearchDto } from '../../../model/pro/ProjectSearchDto';
import { Pro0101Service } from '../../../services/pro/Pro0101Service';
import { Constant } from '../../../constants/constant';
import Pro_0101Item from './Pro_0101Item';
import { useAppDispatch } from '../../../store/hook';
import { showAndHideSpinner } from '../../../reducers/spinnerSlice';
import { setProjectCounter } from '../../../reducers/sidebarSlice';
import AppModal from '../../commons/afp/AppModal';
import Pro_0101From from './form/Pro_0101From';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import Pro_0101Detail from './Pro_0101Detail';

export default function Pro_0101() {

    const dispatch = useAppDispatch();
    const [searchModel, setSearchModel] = useState<ProjectSearchDto>({ typeSearch: Constant.PRO_TYPE[0], keySearch: "" });
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const location = useLocation()
    const [titleModal, setTitleModal] = useState("New project")
    const [projectId, setProjectId] = useState<any>(null)

    useEffect(() => {
        if (location.state?.refreshData) {
            getList();
            window.history.replaceState({}, document.title)
        }

        if (location.state?.postId) {
            viewProject(location.state?.postId)
            window.history.replaceState({}, document.title)
        }
    }, [location])

    useEffect(() => {
        AfpTab.showTab(0);
        AfpSubTs.init();
    }, [])

    useEffect(() => {
        getList()
    }, [searchModel.typeSearch])

    const getList = () => {
        dispatch(showAndHideSpinner(true))
        Pro0101Service.getInstance().getList(searchModel).then(resp => {
            if (resp.data.status) {
                setItems(resp.data.responseData)
            }
            dispatch(showAndHideSpinner(false))
        }).catch(error => {
            dispatch(showAndHideSpinner(false))
        })
    }

    const tabClick = (tabIndex: number) => {
        AfpTab.showTab(tabIndex);
        setSearchModel({
            ...searchModel,
            typeSearch: Constant.PRO_TYPE[tabIndex]
        })
    }

    const handleChangeInput = (event: any) => {
        setSearchModel({
            ...searchModel,
            keySearch: event.target.value
        })
    }

    const closeModal = (data?: any) => {
        setShowModal(false);
    }

    const closeModalDetail = (data?: any) => {
        setShowModalDetail(false);
    }

    const onClose = (event: any) => {
        if (event) {
            toast.success("Save success")
            // Pro0101Service.getInstance().getProjectCounter().then(resp => {
            //     if (resp.data.status) {
            //         dispatch(setProjectCounter(resp.data.responseData))
            //     }
            // }).catch(error => {

            // })
            getList()
        }
        setShowModal(false)
    }

    const onCloseDetail = (event: any) => {
        if (event) {
            toast.success("Delete success")
            getList()
        } else {
            editProject()
        }
        setShowModalDetail(false)
    }

    const viewProject = (projectId: number) => {
        setProjectId(projectId);
        setShowModalDetail(true)
    }

    const editProject = () => {
        setTitleModal("Edit project")
        setShowModal(true)
    }

    const refreshItems = (dto: any) => {
        if (searchModel.typeSearch == Constant.PRO_TYPE[4]) {
            getList();
        } else {
            let index = items.findIndex((item: any) => item.id === dto.id);
            let arr = structuredClone(items);
            let item = arr[index];
            item.isBookmark = dto.isBookmark
            setItems(arr);
        }
    }

    return (
        <>
            <article className="content-area">
                <div className="tit-area">
                    <h1 className="heading1">Projects</h1>
                    <button className="btn1" onClick={() => {
                        setTitleModal("New project")
                        setProjectId(null)
                        setShowModal(true)
                    }}>
                        <i className="xi-plus-min"></i>
                    </button>
                    <div className="side-wrap">
                        <div className="search-area2">
                            <input value={searchModel.keySearch} onChange={handleChangeInput}
                                onKeyUp={(e: any) => {
                                    if (e.key === 'Enter') {
                                        getList()
                                    }
                                }}
                                type="text" placeholder="search" />
                        </div>
                    </div>
                </div>
                <div className="tab-wrap">
                    <div className="tab-type2">
                        <div className="tab-menu">
                            <button onClick={() => { tabClick(0) }} className="tab-btn">All</button>
                            <button onClick={() => { tabClick(1) }} className="tab-btn">My projects</button>
                            <button onClick={() => { tabClick(2) }} className="tab-btn">General projects</button>
                            <button onClick={() => { tabClick(3) }} className="tab-btn">Library projects</button>
                            <button onClick={() => { tabClick(4) }} className="tab-btn">Bookmarked</button>
                            <div className="tab-indicator"></div>
                        </div>

                        <div className="tab-content active">
                            <ul className="tab-board-lst">
                                <Pro_0101Item items={items} refreshItems={() => { getList() }} selectProject={(projectId: number) => viewProject(projectId)} projectType={searchModel.typeSearch} />
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
            {
                showModalDetail && (
                    <AppModal open={showModalDetail} onClose={closeModalDetail} >
                        <Pro_0101Detail projectId={projectId} onClose={onCloseDetail} refreshItems={(dto: any) => { refreshItems(dto) }} />
                    </AppModal>
                )
            }

            {
                showModal && (
                    <AppModal open={showModal} title={titleModal} onClose={closeModal} >
                        <Pro_0101From onClose={onClose} projectId={projectId} />
                    </AppModal>
                )
            }
        </>
    )
}
