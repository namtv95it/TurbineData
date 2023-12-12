import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { setMenus } from '../../reducers/sidebarSlice';
import { useAppDispatch } from '../../store/hook';
import { HeadersUtil } from '../../utils/headersUtil';
import NavGroup from './comp/NavGroup'

export default function SidebarSmall() {
    const [menus, setMenu] = useState<any>([])
    const dispatch = useAppDispatch();
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
            const data = resp.data
            if (data.status) {
                const temp = convertMenu(data.responseData)
                setMenu(temp)
                dispatch(setMenus(resp.data.responseData))
            }
        }).catch((error) => {
            // toast.error(error)
        })
    }, [])
    return (
        <>
            <div className="customizer-setting d-none d-md-block">
                <div id='trigger_menus' className="sam-bg-question btn-rounded shadow-lg btn btn-icon btn-lg p-2" data-bs-toggle="offcanvas" data-bs-target="#menus_" aria-controls="theme-settings-offcanvas">
                    <i className='ri-questionnaire-line fs-22'></i>
                </div>
            </div>
            <div className="offcanvas offcanvas-start border-0" style={{ width: "250px" }} tabIndex={-1} id="menus_">
                <div className="d-flex align-items-center bg-gradient p-3 offcanvas-header sam-bg-question">

                </div>
                {/* <div className='card-body'> */}
                    <div className="navbar-menu">
                        <div id="scrollbar">
                            <div className="container-fluid">
                                <ul className="navbar-nav" id="navbar-nav">
                                    <NavGroup items={menus} showIcon={true} />
                                </ul >
                            </div >
                        </div >
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}
