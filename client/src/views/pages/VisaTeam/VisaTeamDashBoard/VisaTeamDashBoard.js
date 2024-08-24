import React, { useEffect, useState } from 'react';


import DisplayVisaStudentsList from '../DisplayVisaStudentsList/DisplayVisaStudentsList';
import DisplayVisaStudentsOngoingList from '../DisplayVisaStudentsOngoingList/DisplayVisaStudentsOngoingList';
import DisplayVisaStudentsCompletedList from '../DisplayVisaStudentsCompletedList/DisplayVisaStudentsCompletedList';


const VisaTeamDashBoard = () => {
    const visaEmployee = JSON.parse(localStorage.getItem('user'))
    const [VisaTeamStudent, setVisaTeamStudent] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/visa/${visaEmployee.employee_id}`)
            .then((res) => res.json())
            .then((data) => setVisaTeamStudent(data.data[0].students))
    }, [])

    // const [pageNumber, setPageNumber] = useState(0);
    // const papersPerPage = 10;
    // const paperVisited = pageNumber * papersPerPage;
    // const paginatePaper = VisaTeamStudent.slice(paperVisited, paperVisited + papersPerPage);


    // const pageCount = Math.ceil(VisaTeamStudent.length / papersPerPage);
    // const handlePageClick = ({ selected }) => {
    //     setPageNumber(selected);
    // }


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
                    <p className='drawerItem' onClick={(e) => handleDrawer(e, "ANP")}>Ongoing Visa Processing</p>
                    <p className='drawerItem' onClick={(e) => handleDrawer(e, "Gym")}>Success/Rejected</p>
                </div>

                <section className='right drawer-content active-drawer' id='Edu'>
                    <DisplayVisaStudentsList VisaTeamStudent={VisaTeamStudent} setVisaTeamStudent={setVisaTeamStudent} />
                </section>
                <section className='right drawer-content' id='ANP'>
                    <DisplayVisaStudentsOngoingList />
                </section>
                <section className='right drawer-content' id='Gym'>
                    <DisplayVisaStudentsCompletedList />
                </section>

            </div>

        </section>
    );
};

export default VisaTeamDashBoard;