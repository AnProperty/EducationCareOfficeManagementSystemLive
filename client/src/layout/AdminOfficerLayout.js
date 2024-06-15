// /* eslint-disable prettier/prettier */
// import React from 'react';
// import AdminOfficerSideNav from '../components/AdminOfficer/AdminOfficerNav/AdminOfficerSideNav';
// import { Outlet } from 'react-router-dom';
// import { AppHeader } from '../components';

// const AdminOfficerLayout = () => {
//     return (
//         <div className='row'>
//             <div className="mb-5">
//             <AppHeader />
//             </div>

//             <div className='col-md-2 mt-5'>
//                 <AdminOfficerSideNav />
//             </div>
//             <div className='col-md-10'>
//                 <Outlet />
//             </div>

//         </div>
//     );
// };



import React from 'react'
import { AppSidebarForAdminOfficer, AppFooter, AppHeader } from '../components/index';
import { Outlet } from 'react-router-dom';

const AdminOfficerLayout = () => {
    return (
        <div>
            <AppSidebarForAdminOfficer />
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

export default AdminOfficerLayout;