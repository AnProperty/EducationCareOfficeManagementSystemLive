/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import DisplayAdminOfficerStudents from '../DisplayAdminOfficerStudents/DisplayAdminOfficerStudents';
import DisplayAdminOfficerOngoingList from '../DisplayAdminOfficerOngoingList/DisplayAdminOfficerOngoingList';
import DisplayAdminOfficerCompletedList from '../DisplayAdminOfficerCompletedList/DisplayAdminOfficerCompletedList';




const AdminOfficerDashBoard = () => {
    const apllicant = JSON.parse(localStorage.getItem('user'))
    const [applicantStudent, setApplicantStudent] = useState([]);



    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/applicant/${apllicant.employee_id}`)
            .then((res) => res.json())
            .then((data) => setApplicantStudent(data.data[0].students))
    }, [])
    // Filter states

    const handleDrawer = (e, item) => {
        const elementList = document.getElementsByClassName("drawer-content");
        const drawerItemList = document.getElementsByClassName("drawerItem");
        // elementList.forEach(element => {
        //     element.classList.remove("active-drawer");
        // });
        for (let element of elementList) {
            element.classList.remove("active-drawer");
        }
        for (let element of drawerItemList) {
            element.classList.remove("active-link");
        }
        document.getElementById(item).classList.add("active-drawer");
        e.currentTarget.classList.add("active-link")

    }


    return (
        <section className='container'>
            <div className='about'>


                <div className='drawer'>
                    <p className='drawerItem active-link' onClick={(e) => handleDrawer(e, "Edu")}>All Students</p>
                    <p className='drawerItem' onClick={(e) => handleDrawer(e, "ANP")}>Application Processing</p>
                    <p className='drawerItem' onClick={(e) => handleDrawer(e, "Gym")}>Ongoing Visa Processing</p>
                </div>


                <section className='right drawer-content active-drawer' id='Edu'>
                    <DisplayAdminOfficerStudents applicantStudent={applicantStudent} setApplicantStudent={setApplicantStudent} />
                </section>
                <section className='right drawer-content' id='ANP'>
                    <DisplayAdminOfficerOngoingList />
                </section>
                <section className='right drawer-content' id='Gym'>
                    <DisplayAdminOfficerCompletedList />
                </section>

            </div>

        </section>
    );
};

export default AdminOfficerDashBoard;