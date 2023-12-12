import { useState, useEffect } from 'react';
import { AfpTreeMenu } from '../../../../utils/afp/treemenu';
import { useAppDispatch, useAppNavigate } from '../../../../store/hook';
import { setSelectedSideBarMenuId } from '../../../../reducers/docSideBarSlice';

type MenuProps = {
    tsstMenu: any,
    menus: any[],
    parentMenusActive?: any[],
    lev: any,
    selectedMenuId?:any,
    onClickMenu?: (data?: any) => void,
    isShowSubmenu: boolean;
    // refreshMenu: () => void
}

export default function SubMenu(props: MenuProps) {

    const dispatch =  useAppDispatch();
    const appNavigate = useAppNavigate();

    const [menus, setMenus] = useState(props.menus);
    const [lev, setLev] = useState(props.lev);
    const [selectedMenuId, setSelectedMenuId] = useState();
    const [parentMenusActive, setParentMenusActive] = useState<any>([]);

    useEffect(() => {
        setParentMenusActive(props.parentMenusActive);
    }, [props.parentMenusActive]);

    useEffect(() => {
        setLev(props.lev);
        setMenus(props.menus);
    }, [props.lev, props.menus]);

    useEffect(() => {
        setSelectedMenuId(props.selectedMenuId);
    }, [props.selectedMenuId]);
    
    const onClickMenu = (event: any, data: any) => {
        props.onClickMenu?.(data);
        dispatch(setSelectedSideBarMenuId(data.id));  
        appNavigate(props.tsstMenu.url, {"tsstMenuId": props.tsstMenu.menuId, "docMenuId": data.id})
    }

    const onClickTreeMenu = (event: any) => {
        AfpTreeMenu.treeMenu(event.target);
    }

    const checkShowSubmenu = (menu: any) => {
        let isShow = false;
        if (parentMenusActive) {
            parentMenusActive.forEach((ele: any) => {
                if (ele.id === menu.id){
                    isShow = true;
                }
            });
        }   
        return isShow;
    }

    return (
        <>
            <ul className={"level-" + lev + (lev > 1 ? ' sub-menu': '')} style={{display: props.isShowSubmenu?'block':'none'}}>
                {   
                    menus.map((ele: any) => (
                        <li key={ele.id} style={{ cursor: "pointer" }}>
                            <a className= {(ele.children.length > 0? 'caret ': '') + (selectedMenuId == ele.id? "doc-tree-active": "")} onClick={ (ele.children.length > 0 ? (event: any) => onClickTreeMenu(event) : (event)=> onClickMenu(event, ele)) }>{ele.name}</a>
                            {   
                                ele.children?.length > 0 ? <SubMenu tsstMenu={props.tsstMenu} parentMenusActive={props.parentMenusActive} isShowSubmenu={checkShowSubmenu(ele)} menus = {ele.children} lev= {lev + 1} selectedMenuId={selectedMenuId} onClickMenu = {(event) => props.onClickMenu?.(event)}></SubMenu>  : ""
                            }              
                        </li>  
                    ))
                }                  
            </ul>   
            
        </>
    )
}

