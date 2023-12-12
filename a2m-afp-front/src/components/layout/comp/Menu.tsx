import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AfpCommonTs } from '../../../utils/afp/common'
import { useDispatch } from 'react-redux'
import { setSelectedSideBarEditMenuId, setSelectedSideBarMenuId, setSelectedTsstMenuId } from '../../../reducers/docSideBarSlice'
// import { useAppSelector } from '../../../store/hook'

type MenuProps = {
    items: [],
    showIcon: boolean,
    lev: number
}

type iconsMenuMap = {
    [key: string]: ReactJSXElement
}
const icons: iconsMenuMap = {
    'MNU_01': <i className="mdi mdi-cog-outline" ></i>,
    'MNU_02': <i className="mdi mdi-leaf-circle-outline" ></i>,
    'MNU_03': <i className="mdi mdi-book-multiple-outline" ></i>,
    'MNU_04': <i className="bx bx-chart" ></i>,
    'MNU_05': <i className="mdi mdi-api" ></i>,
    'MNU_06': <i className="mdi mdi-developer-board" ></i>,
    'MNU_07': <i className="xi-home"></i>,
    'MNU_08': <i className="xi-file-text"></i>,
    'MNU_09': <i className="xi-download"></i>,
    'MNU_10': <i className="xi-forum"></i>,
    'MNU_11': <i className="xi-library-add"></i>,
}

export default function Menu(props: MenuProps) {

    const { items, showIcon, lev } = props

    const location = useLocation()
    const url = location.pathname

    const navagite = useNavigate();
    const dispatch = useDispatch();

    const handleClickLink = (item: any) => {
        let url = item.url;
        if (url.startsWith("/doc")){
            url = url + "?tsstMenuId=" + item.menuId;
            dispatch(setSelectedTsstMenuId(item.menuId))
            dispatch(setSelectedSideBarMenuId(""));
            dispatch(setSelectedSideBarEditMenuId(null))
        }
        navagite(url)
    }

    // const projectCounter = useAppSelector(state => state.menus.projectCounter)

    const [openMenu, setOpen] = useState('')

    // useEffect(() => {
    //     AfpCommonTs.init();
    // }, [])

    const navGroup = (items: [], showIcon: boolean, lev: number) => {
        return (
            <ul className={`depth${lev}-ul`}>
                {
                    items.map((item: any) => {
                        return (
                            item.tsstMenuDtos.length == 0 ? (
                                <li key={item.menuId}>
                                    <a onClick={() => handleClickLink(item)} className={`${url.includes(item.url) && item.url != "" ? 'active' : ''}`}>
                                        {showIcon && icons[item.menuId]}
                                        <span className="menu-name">{item.menuNm}</span>
                                        {/* {item.menuId == "MNU_07" && <span className="number">{projectCounter}</span>} */}
                                        {lev == 1 && <span className="tooltip">{item.menuNm}</span>}
                                    </a>
                                </li>
                            ) : (
                                <li className={`sub-menu ${item.menuId === openMenu ? 'open' : ''}`} key={item.menuId}>
                                    <a className={`${url.includes(item.url) && item.url != "" ? 'active' : ''}`}
                                        onClick={() => {
                                            if (openMenu == item.menuId) {
                                                setOpen('')
                                            } else {
                                                setOpen(item.menuId)
                                            }
                                        }}
                                    >
                                        {showIcon && icons[item.menuId]}
                                        <span className="menu-name">{item.menuNm}</span>
                                        {lev == 1 && <span className="tooltip">{item.menuNm}</span>}
                                    </a>
                                    <Menu items={item.tsstMenuDtos} showIcon={false} lev={lev + 1} />
                                    {
                                        // navGroup(item.tsstMenuDtos, false, lev + 1)
                                    }
                                </li>
                            )
                        )
                    })
                }
            </ul>
        )
    }

    return (
        <>
            {
                navGroup(items, showIcon, lev)
            }
        </>
    )
}
