import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedSideBarEditMenuIdSelector, setSelectedSideBarEditMenuId } from '../../../../reducers/docSideBarSlice';

type MenuProps = {
    menus: any[],
    lev: any,
    parentFold: boolean,
    onDelete?: (data?: any) => void,
    onEdit?: (data?: any) => void,
}

export default function TreeMenuEdit(props: MenuProps) {

    const dispatch = useDispatch();
    const selectedMenuId = useSelector(selectedSideBarEditMenuIdSelector)


    const [menus, setMenus] = useState(props.menus);
    const [lev, setLev] = useState(props.lev);
    const [parentFold, setParentFold] = useState(props.parentFold);

  
    useEffect(() => {
        setMenus(props.menus);
        setLev(props.lev);
        setParentFold(props.parentFold);

    }, [props.menus, props.lev, props.parentFold]);

    const onExpandTreeMenu = (event: any, isHasChildren: any, data: any) => {
        data.isFold = data.isFold? false: true;
        setMenus(structuredClone(menus));
    }

    const onClickTreeMenu = (event: any, isHasChildren: any, data: any) => {
        if (data.id === selectedMenuId) {
            dispatch(setSelectedSideBarEditMenuId(null))
        }else {
            dispatch(setSelectedSideBarEditMenuId(data.id))
        }
        
    }

    const checkExistContent = () => {

    }
    
    return (
        <>  
            <ul className={"level-" + lev + (lev > 1 ? ' sub-menu': '')} style={{marginLeft: lev > 2 ? '50px': '', display: lev <=1 || !parentFold?'block': 'none' }}>
                {
                    menus.map((ele: any) => (
                        ele.isDeleted ? 
                        ""
                        :
                        <li key={ele.id}>
                           {ele.children.length > 0? <button onClick={ (ele.children.length > 0 ? (event: any) => onExpandTreeMenu(event, true, ele) : (event)=> onExpandTreeMenu(event, false, ele)) } className='cavet-button'><i className={(ele.children.length > 0 && ele.isFold? 'xi-plus-min ': 'xi-minus-min')}></i></button> : '' } 
                            <a className= {(ele.children.length > 0? "caret ": "") + (selectedMenuId == ele.id ? " tree-active": "" )} onClick={ (event: any) => onClickTreeMenu(event, true, ele)}>
                                {ele.name}
                                <span className="btn-wrap exc">
                                    <button className="edit-btn" title="수정" onClick={() =>  props.onEdit?.(ele)}></button>
                                    <button className="delete-btn" title="삭제" onClick={() => props.onDelete?.(ele) }></button>
                                </span>
                            </a>
                            
                            {   
                                ele.children?.length > 0 ? 
                                <TreeMenuEdit 
                                    parentFold = {ele.isFold? true: false}
                                    menus = {ele.children} 
                                    lev= {lev + 1} 
                                    onDelete={(event) => props.onDelete?.(event)} 
                                    onEdit={(event) => props.onEdit?.(event)} 
                                />: 
                                <></>
                            }           
                        </li> 
                    ))
                }

            </ul>         
        </>
    )
}

