import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../store/hook';
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice';
import { Doc0101Service, afpMenuDataService } from '../../../../services/doc/Doc0101Service';
import MenuPopup from '../popup/MenuPopup';
import { AfpModal } from '../../../../utils/afp/modal';
import { AfpMenu } from '../../../../model/doc/AfpMenu';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import TreeMenuEdit from './TreeMenuEdit';
import { DataUtil } from '../../../../utils/dataUtil';
import { useSelector } from 'react-redux';
import { selectedTsstMenuIdSelector, setSelectedSideBarEditMenuId, setSelectedSideBarMenuId } from '../../../../reducers/docSideBarSlice';

type EditProps = {
    refreshTreeMenu?: (data?: any) => void
}

export default function Edit(props: EditProps) {

    const [doc0101Service] = useState<Doc0101Service>(new Doc0101Service());

    const dispatch = useAppDispatch();
    const menuId = useSelector(selectedTsstMenuIdSelector);

    const [menus, setMenus] = useState<any[]>([]);
    const [treeData, setTreeData] = useState<any[]>([]);
    const [isOpenModal, setOpenModal] = useState(false);
    const [menuEdit, setMenuEdit] = useState<AfpMenu>(new AfpMenu());
    const [menuDeleteList, setMenuDeleteList] = useState<any[]>([]);

    useEffect(() => {
        AfpModal.modal();
        getAllAfpMenus({});
    }, []);

    const getAllAfpMenus = (request: any) => {
        dispatch(showAndHideSpinner(true));
        request.tsstMenuId = menuId;
        doc0101Service.searchMenu(request).then(res => {
            if (res.data.status) {
                res.data.responseData.forEach(function (each: any) {
                    each['isFold'] = true;
                })
                setTreeData(makeDataForTreeMenu(res.data.responseData));
                setMenus(res.data.responseData);
            }
            dispatch(showAndHideSpinner(false));
        })
    }

    const openModal = () => {
        setOpenModal(true);
        setMenuEdit({});
    }

    const onClose = (event :any) => {
        setOpenModal(false);
        if (event) {
            refreshMenu();
        }
        
    }

    const handleEditMenu = (event: any) => {
        setOpenModal(true);
        setMenuEdit(event);
    }

    const handleDeleteMenu = (event: any) => {
        let deleteIds: any[] = menuDeleteList;
        deleteIds.push(event.id);
        setMenuDeleteList(deleteIds);

        let menuTemps: any[] = menus;
        menuTemps.forEach(element => {
            if (element.id === event.id) {
                element.isDeleted = true;
            }
        });
        setTreeData(makeDataForTreeMenu(menuTemps));
    }

    const makeDataForTreeMenu = (datas: any[]) => {
        let temps = DataUtil.convertDataForTreeMenu("menuParentId", "id", datas);
        return temps;
    }

    const handleSave = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#809bf1",
            cancelButtonColor: "#727379",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.value) {
                dispatch(showAndHideSpinner(true));
                doc0101Service.deleteAfpMenu(menuDeleteList).then(res => {
                    if (res.data.status) {
                        toast.success("Save successfull");
                        dispatch(setSelectedSideBarMenuId(""));
                        dispatch(setSelectedSideBarEditMenuId(null));
                        refreshMenu();
                    }else {
                        toast.error("Save failed, An error occurred during processing");
                    }
                    dispatch(showAndHideSpinner(false));
                })
            }
          });        
    }

    const refreshMenu = () => {
        getAllAfpMenus({});
        afpMenuDataService.setRefreshMenu(!afpMenuDataService.getRefreshMenu().toPromise().then(res => {return res}));
        
    }

    return (
        <>
            <article className="content-area documents-edit" id="doc-edit-treemenu">
                <div className="documents-edit-area">
                    <div className="tit-area">
                        <div className="side-wrap">
                            <button className="btn1" title="메뉴 편집" modal-id="modal" onClick={openModal}>
                                <i className="xi-plus-min"></i>
                            </button>
                            <button className="btn2" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                    <div className="scroll-wrap" style={{ maxHeight: 'calc(100% - 83px)', overflowY: 'auto' }}>
                        <div className="tree-menu">
                            <TreeMenuEdit 
                                parentFold={true}
                                lev={1} 
                                menus = {treeData} 
                                onEdit = {(event: any) => handleEditMenu(event)} 
                                onDelete={(event: any) => handleDeleteMenu(event)} 
                            />
                        </div>
                        </div>
                    </div>
            </article>
            {/* <MenuPopup onClose= {(event: any) => onClose(event)}/> */}
            {
                isOpenModal 
                ? 
                <MenuPopup 
                    onClose= {(event: any) => onClose(event)} 
                    menu={menuEdit} 
                /> 
                : ""
            }
            
        </>
    )
}
