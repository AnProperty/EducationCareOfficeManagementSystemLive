/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import './CounselorHomePage.css'
import DisplayCounselorStudents from './DisplayCounselorStudents/DisplayCounselorStudents';
import DisplayCounselorFollowUpStudents from './DisplayCounselorFollowUpStudents/DisplayCounselorFollowUpStudents';
import DisplayCounselorEnrolledStudents from './DisplayCounselorEnrolledStudents/DisplayCounselorEnrolledStudents';





const CounselorHomePage = () => {
    const counselor = JSON.parse(localStorage.getItem('user'))
    const [counselorStudent, setCounselorStudent] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/counselor/${counselor.employee_id}`)
            .then((res) => res.json())
            .then((data) => setCounselorStudent(data.data[0].students))
    }, [])



    // let followUp = []
    // let enrolled = []

    // for (let index = 0; index < counselorStudent.length; index++) {

    //     const element = counselorStudent[index];
    //     if (element.status === 'enrolled') {
    //         enrolled.push(element)
    //     } else if (element.status === 'follow-up') {
    //         followUp.push(element)
    //     }

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





    // Filter Start



    // Filter End













    return (
        <section className='container'>
            <div className='about'>
                <div className='drawer'>
                    <p className='drawerItem active-link' onClick={(e) => handleDrawer(e, "Edu")}>All Students</p>
                    <p className='drawerItem' onClick={(e) => handleDrawer(e, "ANP")}>Follow Up</p>
                    <p className='drawerItem' onClick={(e) => handleDrawer(e, "Gym")}>Enrolled Students</p>
                </div>


                <section className='right drawer-content active-drawer' id='Edu'>
                    <DisplayCounselorStudents counselorStudent={counselorStudent} setCounselorStudent={setCounselorStudent} />
                </section>
                <section className='right drawer-content' id='ANP'>
                    <DisplayCounselorFollowUpStudents />
                </section>
                <section className='right drawer-content' id='Gym'>
                    <DisplayCounselorEnrolledStudents />
                </section>
                {
                    console.log("counselorStudent", counselorStudent)
                }
            </div>

        </section>
    );
};

export default CounselorHomePage;