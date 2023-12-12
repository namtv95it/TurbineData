import { useEffect, useState } from 'react';
import SubMenu from './Submenu';
import { DataUtil } from '../../../../utils/dataUtil';
import { Doc0101Service, afpMenuDataService } from '../../../../services/doc/Doc0101Service';
import { useAppDispatch } from '../../../../store/hook';
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice';
import { selectedSideBarMenuIdSelector, selectedTsstMenuIdSelector } from '../../../../reducers/docSideBarSlice';
import { useSelector } from 'react-redux';
import { AuthConstant } from '../../../../constants/authConstant';

type SideMenuProps = {
    title?: any,
    editMenus: () => void,
    onClickMenu: (data?: any) => void,
    onClose?: (data?: any) => void
}

export default function SideMenu(props: SideMenuProps) {

    // const url = window.location.href;
    // const params = new URLSearchParams(url.split("?")[1]);
    // const menuId = params.get('menuId');

    // const menuId = getParams

    const dispatch = useAppDispatch();
    const selectedMenuId = useSelector(selectedSideBarMenuIdSelector);
    const tsstMenuId = useSelector(selectedTsstMenuIdSelector);
    const userInfo = useSelector((state: any) => state.userInfo.userInfo);

    const [treeData, setTreeData] = useState<any>([]);
    const [doc0101Service] = useState<Doc0101Service>(new Doc0101Service());
    const [tsstMenu, setTsstMenu] = useState<any>({});
    const [parentMenusActive, setParentMenusActive] = useState<any>([]);

    useEffect(() => {
        if (selectedMenuId){
            getAllParentMenu(selectedMenuId);
        } else {
            setParentMenusActive(undefined);
        }
    }, [selectedMenuId]);

    useEffect(() => {
        getAllAfpMenus({});
        afpMenuDataService.getRefreshMenu().subscribe(res => {
            getAllAfpMenus({});
        });
        getTsstMenu();
    }, []);

    const getAllAfpMenus = (request?: any) => {
        dispatch(showAndHideSpinner(true)); 
        request.tsstMenuId = tsstMenuId;
        doc0101Service.searchMenu(request).then(res => {
            if (res.data.status) {
                let menus: any[] = res.data.responseData;
                setTreeData(DataUtil.convertDataForTreeMenu("menuParentId", "id", menus));             
              }
            dispatch(showAndHideSpinner(false));
        })
    }

    const getAllParentMenu = (menuId: any) => {
        doc0101Service.getAllParentMenu(menuId).then(res => {
            setParentMenusActive(res.data.responseData);
        });
    }

    const onClickMenu = (event: any) => {
        props.onClickMenu(event)
    }

    const handleSearchMenu = (event: any) => {
        if (event.key === 'Enter') {
           let request: any = {
                afpMenuName: event.target.value
           }
           getAllAfpMenus(request);
        }
    }

    const getTsstMenu = () => {
        doc0101Service.getTsstMenuById(tsstMenuId).then(res => {
            if (res.data.status) {
                setTsstMenu(res.data.responseData);
            }
        })
    }

    return (
        <>
            <article className="side-menu-area">
                <div className="tit-area" style={{justifyContent: "space-between"}}>
                    <p className="tit">{tsstMenu.menuNm}</p>
                    {
                        (userInfo?.rolesStr || "").includes(AuthConstant.ROLE_ADMIN) 
                        ? 
                            <button className="btn1" title="메뉴수정" type="button" onClick={props.editMenus}>
                                <i className="las la-edit"></i>
                            </button> 
                        : ""
                    }
                    
                </div>
                <div className="search-area2">
                    <input type="text" placeholder="search" onKeyUp={(event) => handleSearchMenu(event)}/>
                </div>
                <div className="tree-menu scroll-wrap" style={{maxHeight: 'calc(100% - 83px)', overflowY: 'auto'}} id="doc-treemenu">
                    <SubMenu tsstMenu={tsstMenu} isShowSubmenu={true} parentMenusActive={parentMenusActive} menus={treeData} lev={1} selectedMenuId={selectedMenuId} onClickMenu={(event) => onClickMenu(event) }></SubMenu>
                </div>
            </article>
        </>
    )
}
