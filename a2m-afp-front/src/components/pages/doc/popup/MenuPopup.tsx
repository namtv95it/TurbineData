import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../store/hook';
import { showAndHideSpinner } from '../../../../reducers/spinnerSlice';
import { Doc0101Service } from '../../../../services/doc/Doc0101Service';
import AppDropdown from '../../../commons/afp/AppDropdown';
import { toast } from "react-toastify";
import { AfpMenu } from '../../../../model/doc/AfpMenu';
import { useSelector } from 'react-redux';
import { selectedSideBarEditMenuIdSelector, selectedTsstMenuIdSelector } from '../../../../reducers/docSideBarSlice';

type MenuPopupProps = {
    menu: any,
    onClose?: (data?: any) => void
}

export default function MenuPopup(props: MenuPopupProps) {

    const [doc0101Service] = useState<Doc0101Service>(new Doc0101Service());
    const dispatch = useAppDispatch();
    const menuId = useSelector(selectedTsstMenuIdSelector);
    const menuParentId = useSelector(selectedSideBarEditMenuIdSelector);

    const [menus, setMenus] = useState<any>([]);
    const [saveRequest, setSaveRequest] = useState<AfpMenu>(props.menu);

    useEffect(() =>{
        $('.modal').removeClass('open').filter('#modal').addClass('open');
        $('html').addClass('scroll-hidden'); 
        getAllAfpMenus();
    }, []);

    useEffect(() =>{
        if (!saveRequest.id){
            setSaveRequest({
                ...saveRequest,
                menuParentId: menuParentId
            })
        }  
    }, [menuParentId]);

    const getAllAfpMenus = () => {
        dispatch(showAndHideSpinner(true));
        let request: any = {
            tsstMenuId: menuId
        }
        doc0101Service.searchMenu(request).then(res => {
            if (res.data.status){
                let temps: any[] = res.data.responseData;
                let obj: any = {
                    id: null,
                    name: "None"
                }
                temps.unshift(obj)
                setMenus(temps);               
            }      
            dispatch(showAndHideSpinner(false)); 
        })
    }

    const hanldChange = (event: any) => {
        setSaveRequest({
            ...saveRequest,
            [event.target.name]: event.target.value
        });
    }

    const onChangeParentMenu = (event: any) => {
        setSaveRequest({
            ...saveRequest,
            menuParentId: event
        });
    }

    const onSubmit = () => {
        if (!saveRequest.name){
            toast.error("The name is blank, please fill in all the information.");
            return;
        }
        if (!saveRequest.nameKr){
            toast.error("The name is blank, please fill in all the information.");
            return;
        }

        // if (!saveRequest.orderNo){
        //     toast.error("The order no is not null, please fill in all the information.");
        //     return;
        // }
        saveMenu();
    }

    const saveMenu = () => {
        dispatch(showAndHideSpinner(true));
        let request = {
            ...saveRequest,
            tsstMenuId: menuId
        }
        
        if (request.id) {
            doc0101Service.updateAfpMenu(request).then(res => {
                if (res.data.status) {
                    toast.success("Save successfull");
                    props.onClose?.(true);           
                }else {
                    toast.error("Save failed");
                }
                dispatch(showAndHideSpinner(true));
            })
        } else {
            doc0101Service.createAfpMenu(request).then(res => {
                if (res.data.status) {
                    toast.success("Save successfull");
                    props.onClose?.(true);           
                }else {
                    toast.error("Save failed");
                }
                dispatch(showAndHideSpinner(true));
            });
        }
        
    }

    return (
        <>  
            <div className= "modal" id="modal">
                <div className="modal-cont">
                    <h1 className="modal-tit">Edit menu</h1>
                    <div className="modal-content-area">
                        <div className="input-group">
                            <p className="tit">Name</p>
                            <label>
                                <input type="text" name="name" placeholder="name" onChange={hanldChange} value={saveRequest.name || ''}/>
                            </label>
                        </div>

                        <div className="input-group">
                            <p className="tit">Name Kr</p>
                            <label>
                                <input type="text" name='nameKr' placeholder="name" onChange={hanldChange} value={saveRequest.nameKr || ''}/>
                            </label>
                        </div>
                        {
                            saveRequest.id
                            ? 
                            <div className="input-group">
                                <p className="tit">Order No</p>
                                <input type="number" name='orderNo' placeholder="주문 번호를 입력합니다." value={saveRequest.orderNo} onChange={hanldChange}/>
                            </div>
                            :
                            ""
                        }
                        

                        <div className="input-group">
                            <p className="tit">Parent Menu</p>
                            <AppDropdown sources = {menus} onChange={(event)=> onChangeParentMenu(event)} bindLabel={'name'} bindValue={'id'} value={saveRequest.menuParentId}/>
                        </div>
                    </div>

                    <div className="modal-btn-wrap">
                        <button className="btn3" onClick={() => props.onClose?.()}>Cancel</button>
                        <button className="btn2" onClick={onSubmit}>Save</button>
                    </div>

                    <button className="close-btn" onClick={() => props.onClose?.()}></button>
                </div>  
            </div>                  
        </>
    )
}
