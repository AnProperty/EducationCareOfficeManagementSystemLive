import React from 'react';
import { AppSidebarForCounselor, AppFooter, AppHeader } from '../components/index';
import { Outlet } from 'react-router-dom';

const CounselorLayout = () => {
    return (
        <div>
            <AppSidebarForCounselor />
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

export default CounselorLayout;