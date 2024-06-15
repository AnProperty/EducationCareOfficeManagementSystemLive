
import React from 'react'
import { AppFooter, AppHeader, AppSidebarForReceptionist } from '../components/index';
import { Outlet } from 'react-router-dom';

const ReceptionistLayout = () => {
    return (
        <div>
            <AppSidebarForReceptionist />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <Outlet />
                </div>
                <AppFooter />
            </div>
        </div>
    )
}

export default ReceptionistLayout;