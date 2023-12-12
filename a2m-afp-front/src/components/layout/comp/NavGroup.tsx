
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Constant } from '../../../constants/constant'
import { useAppSelector } from '../../../store/hook'

const activeLink = {
    color: '#4a8ae9'
}

type iconsMap = {
    [key: string]: ReactJSXElement
}
const icons: iconsMap = {
    'MNU_01': <i className="mdi mdi-cog-outline" ></i>,
    'MNU_02': <i className="mdi mdi-leaf-circle-outline" ></i>,
    'MNU_03': <i className="mdi mdi-book-multiple-outline" ></i>,
    'MNU_04': <i className="bx bx-chart" ></i>,
    'MNU_05': <i className="mdi mdi-api" ></i>,
    'MNU_06': <i className="mdi mdi-developer-board" ></i>,
    'MNU_07': <i className="mdi mdi-developer-board" ></i>,
    'MNU_08': <i className="mdi mdi-developer-board" ></i>,
    'MNU_09': <i className="mdi mdi-developer-board" ></i>,
    'MNU_10': <i className="mdi mdi-developer-board" ></i>,
}


function NavGroup({ items, showIcon }: any) {

    const [openMenu, setOpen] = useState('')
    const navagite = useNavigate()
    const location = useLocation()
    const url = location.pathname
    const { t } = useTranslation()
    const sideBarShow = useAppSelector(state => state.layout.sideBarShow)
    const sideBarShowSmall = useAppSelector(state => state.layout.sideBarShowSmall)

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
    const navGroup = (item: any, showIcon: boolean) => {
        return (
            <li key={item.menuId} className="nav-item" style={!sideBarShow && !sideBarShowSmall ? { backgroundColor: "#fff", minWidth: `${sideBarShow ? '' : (!showIcon ? 'max-content' : '')}` } : {}}>
                {
                    item.tsstMenuDtos.length > 0 ? (
                        <a className={`nav-link menu-link ${url.includes(item.url) && item.url != "" ? 'menu-active' : ''}`} id={item.menuId} data-bs-toggle="collapse" role="button"
                            aria-expanded={item.menuId === openMenu} onClick={() => {
                                if (openMenu == item.menuId) {
                                    setOpen('')
                                } else {
                                    setOpen(item.menuId)
                                }
                            }}>
                            {showIcon && icons[item.menuId]}
                            <span data-key="t-apps">{sideBarShow || sideBarShowSmall ? translateMenuNm(item) : (!showIcon ? translateMenuNm(item) : "")}</span>
                        </a>
                    ) : (
                        <a className={`nav-link menu-link ${url === item.url ? 'menu-active' : ''}`} id={item.menuId} onClick={() => handleClickLink(item.url)} role="button" aria-expanded="false">
                            {showIcon && icons[item.menuId]}
                            <span data-key="t-apps">{translateMenuNm(item)}</span>
                        </a>
                    )
                }

                {
                    item.tsstMenuDtos.length > 0 ?
                        (
                            <div className={`collapse menu-dropdown ${item.menuId === openMenu ? "show" : ""} lvl${item.lev}`} id={"MENU_" + item.menuId}>
                                <ul className="nav nav-sm flex-column">
                                    <NavGroup items={item.tsstMenuDtos} showIcon={false} />
                                </ul>
                            </div>
                        ) : null
                }
            </li>
        )
    }

    const handleClickLink = (url: string) => {
        navagite(url)
    }

    const eventListener = useCallback((e: any) => {
        var container = $("div .collapse");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            setOpen('')
        }
    }, [])

    useEffect(() => {
        if (!sideBarShow) {
            document.addEventListener('mouseup', eventListener);
        } else {
            document.removeEventListener('mouseup', eventListener);
        }
    }, [sideBarShow])

    return (
        <>
            {
                items.map((item: any) => navGroup(item, showIcon))
            }
        </>
    )
}

export default NavGroup
