
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { HeadersUtil } from '../../utils/headersUtil';

// import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
// import QueryStatsIcon from '@mui/icons-material/QueryStats';
// import ApiIcon from '@mui/icons-material/Api';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
// import ForestIcon from '@mui/icons-material/Forest';
import NavGroup from './comp/NavGroup';
import { setMenus, setProjectCounter } from '../../reducers/sidebarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useNavigate } from 'react-router';
import { MenuConstant } from '../../constants/menuConstant';
import { AfpCommonTs } from '../../utils/afp/common';
import { Pro0101Service } from '../../services/pro/Pro0101Service';
import { Constant } from '../../constants/constant';
import Menu from './comp/Menu';
import AppModal from '../commons/afp/AppModal';
import Pro_0101From from '../pages/pro/form/Pro_0101From';
import { useLocation } from 'react-router-dom';

export const icons: any = {
    // "MNU_01": <SettingsApplicationsIcon />,
    // "MNU_02": <ForestIcon />,
    // "MNU_03": <WorkspacePremiumIcon />,
    // "MNU_04": <QueryStatsIcon />,
    // "MNU_05": <ApiIcon />
}

export default function Sidebar() {

    const navagite = useNavigate();
    const [menus, setMenu] = useState<any>([])
    const dispatch = useAppDispatch();
    const sideBarShow = useAppSelector(state => state.layout.sideBarShow)
    // const projectCounter = useAppSelector(state => state.menus.projectCounter)
    // const [pro0101Service] = useState<Pro0101Service>(new Pro0101Service())
    // const [projectCounter, setProjectCounter] = useState<number>(0)

    useEffect(() => {
        function convertMenu(menus: any) {
            var map: any = {};
            var roots: any[] = [];
            var node;
            for (let i = 0; i < menus.length; i++) {
                map[menus[i].menuId] = i;
            }

            for (let i = 0; i < menus.length; i++) {
                node = menus[i];
                if (node.tsstMenu != null || node.tsstMenu != undefined) {
                    menus[map[node.tsstMenu.menuId]].tsstMenuDtos.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots;
        }

        axios.get(process.env.REACT_APP_API_URL + "/sys/sys0101/getMenuByUser.exclude", {
            headers: HeadersUtil.getHeadersAuth()
        }).then((resp) => {
            // let menu = structuredClone(MenuConstant.MENU)
            // const data = resp.data
            // const tempMenu = data.responseData.concat(menu)
            // const menus = resp.data.responseData.concat(menu)
            // if (data.status) {
            //     const temp = convertMenu(tempMenu)
            //     setMenu(temp)
            //     dispatch(setMenus(menus))
            // }
            const data = resp.data
            if (data.status) {
                // const temp = convertMenu(data.responseData)
                setMenu(data.responseData)
                // dispatch(setMenus(resp.data.responseData))
            }
        }).catch((error) => {
            toast.error(error)
        })

        // Pro0101Service.getInstance().getProjectCounter().then(resp => {
        //     if (resp.data.status) {
        //         dispatch(setProjectCounter(resp.data.responseData))
        //     }
        // }).catch(error => {

        // })
    }, [])

    const handleClickLink = (url: string) => {
        navagite(url)
    }

    useEffect(() => {
        AfpCommonTs.init();
    }, [])

    const [showModal, setShowModal] = useState(false);
    const location = useLocation()

    const closeModal = (data?: any) => {
        setShowModal(false);
    }

    const onClose = (event: any) => {
        setShowModal(false)
        if (event) {
            const url = location.pathname
            // Pro0101Service.getInstance().getProjectCounter().then(resp => {
            //     if (resp.data.status) {
            //         dispatch(setProjectCounter(resp.data.responseData))
            //     }
            // }).catch(error => {

            // })
            if (url.includes("/project")) {
                navagite("/project", { state: { refreshData: new Date().getTime() } })
            } else {
                navagite("/project")
            }
        }
    }

    return (
        // <div classNameName={`app-menu navbar-menu ${!sideBarShow ? 'className-sidebar-width' : ''}`}>
        //     <div classNameName="navbar-brand-box" style={{ padding: 0 }}>
        //         <a onClick={() => navagite("/dashboard")} classNameName="logo logo-dark">
        //             {
        //                 sideBarShow ? (
        //                     <>
        //                         <span classNameName="logo-lg">
        //                             <img src="/assets/images/logo-green.png" alt="" height="40" />
        //                         </span>
        //                     </>
        //                 ) : (
        //                     <>
        //                         <span classNameName="logo-lg">
        //                             <img src="/assets/images/logo-green.png" alt="" height="16" />
        //                         </span>
        //                     </>
        //                 )
        //             }
        //         </a>
        //         <button type="button" classNameName="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
        //             <i classNameName="ri-record-circle-line"></i>
        //         </button>
        //     </div>
        //     <div id="scrollbar">
        //         <div classNameName="container-fluid">
        //             <div id="two-column-menu">
        //             </div>
        //             <ul classNameName="navbar-nav" id="navbar-nav">
        //                 <NavGroup items={menus} showIcon={true} />
        //             </ul >
        //         </div >
        //     </div >
        //     <div classNameName="sidebar-background"></div>
        // </div >
        <>
            <article className="left-area">
                <button className="new-project-btn" onClick={() => {
                    setShowModal(true)
                }}>
                    <span>New project</span>
                </button>

                <aside className="left-menu">
                    <Menu items={menus} showIcon={true} lev={1} />
                </aside>
                <button className="collapse-toggle"></button>
            </article>
            {
                showModal && (
                    <AppModal open={showModal} title='New project' onClose={closeModal} >
                        <Pro_0101From onClose={onClose} />
                    </AppModal>
                )
            }
        </>
    )
}
