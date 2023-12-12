import { useState } from 'react';
import SideMenu from '../common/SideMenu';
import Edit from '../common/Edit';
import Content from '../common/Content';

export default function Doc0101() {
    
    const [isEdit, setIsEdit] = useState(false);

    const editMenus = () => {
        setIsEdit(!isEdit);
    }

    const onclickAfpMenu = (event: any) => {
        setIsEdit(false);
    }

    return (
        <>
            <SideMenu editMenus={editMenus} onClickMenu={(event) => onclickAfpMenu(event)}></SideMenu>
            {
                isEdit ? <Edit/> : <Content/>
            }
        </>
    )
}
