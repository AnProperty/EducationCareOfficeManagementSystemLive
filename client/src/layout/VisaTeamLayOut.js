
import React from 'react'
import { AppFooter, AppHeader, AppSidebarForReceptionist, AppSidebarForVisaTeam } from '../components/index';
import { Outlet } from 'react-router-dom';

const VisaTeamLayOut = () => {
    return (
        <div>
            <AppSidebarForVisaTeam />
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

export default VisaTeamLayOut;