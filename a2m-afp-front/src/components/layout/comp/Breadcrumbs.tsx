import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom'
import { Constant } from '../../../constants/constant'
import { useAppSelector } from '../../../store/hook'

export default function Breadcrumbs() {
    const navagite = useNavigate();
    const location = useLocation()
    const menus = useAppSelector(state => state.menus.menus)
    var currentMenu = ''
    var arrParrent: any[] = []
    for (let i = 0; i < menus.length; i++) {
        if (menus[i]['url'] != "" && menus[i]['url'] === location.pathname) {
            currentMenu = menus[i]
            arrParrent = [...getParrentMenu(menus, menus[i]['tsstMenu']), currentMenu]
            break;
        }
    }

    function getParrentMenu(menus: any, tsstMenu: any) {
        if (tsstMenu == null) {
            return [];
        }
        let roots: any[] = [];
        menus.forEach((e: any) => {
            if (e['menuId'] == tsstMenu['menuId']) {
                roots = [...getParrentMenu(menus, e.tsstMenu), e]
                return;
            }
        })
        return roots;
    }



    const { t, i18n } = useTranslation()
    const lang = localStorage.getItem(Constant.LANGUAGE) || Constant.SOUTH_KOREA

    const translateMenuNm = useCallback((item: any) => {
        if (Constant.SOUTH_KOREA === lang) {
            return item.menuNm
        } else if (Constant.ENGLISH === lang) {
            return item.menuNmEn
        } else {
            return item.menuNmVi
        }
    }, [lang])

    return (
        <div className="row breadcrumb-position">
            <div className="col-12">
                <div className="page-title-box d-flex d-sm-flex align-items-center justify-content-between">
                    <h2 className="mb-sm-0 card-title mb-0 flex-grow-1">{translateMenuNm(currentMenu)}</h2>

                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">
                                <a onClick={() => navagite("/dashboard")}><i className="ri-home-2-line"></i></a>
                            </li>
                            {
                                arrParrent.map((e, index) => {
                                    return <li key={index} className="breadcrumb-item active">{translateMenuNm(e)}</li>
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div >

    )
}
