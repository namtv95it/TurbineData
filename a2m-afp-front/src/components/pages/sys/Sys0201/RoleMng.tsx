import React, { useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import Role from './Role-Mng/Role';
import RoleUser from './Role-User-Mng/RoleUser';
import UserRole from './User-Role-Mng/UserRole';
import RoleMenu from './Role-Menu-Mng/RoleMenu';
import MenuRole from './Menu-Role-Mng/MenuRole';
import './sys0201.css'
import { useTranslation } from 'react-i18next';

export default function RoleMng() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { t, i18n } = useTranslation()
    return (
        <>
            <div className="w-100">
                <div className='mb-3'>
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel header={`${t('sys0201.tab.header.role')}`}>
                            <Role />
                        </TabPanel>
                        <TabPanel header={`${t('sys0201.tab.header.roleUser')}`}>
                            <RoleUser />
                        </TabPanel>
                        <TabPanel header={`${t('sys0201.tab.header.userRole')}`}>
                            <UserRole />
                        </TabPanel>
                        <TabPanel header={`${t('sys0201.tab.header.roleMenu')}`}>
                            <RoleMenu />
                        </TabPanel>
                        <TabPanel header={`${t('sys0201.tab.header.menuRole')}`}>
                            <MenuRole />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </>
    )
}
