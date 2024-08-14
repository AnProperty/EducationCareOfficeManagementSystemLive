/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import DisplayAdminOfficerStudents from '../DisplayAdminOfficerStudents/DisplayAdminOfficerStudents';



const AdminOfficerDashBoard = () => {
    const apllicant = JSON.parse(localStorage.getItem('user'))
    const [applicantStudent, setApplicantStudent] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/applicant/${apllicant.employee_id}`)
            .then((res) => res.json())
            .then((data) => setApplicantStudent(data.data[0].students))
    }, [])


console.log("applicantStudent",applicantStudent);
    

    return (
        <section className='container'>
            <div className='about'>
                


                <section className='right drawer-content active-drawer' id='Edu'>
                    <DisplayAdminOfficerStudents applicantStudent={applicantStudent} />
                </section>
            </div>

        </section>
    );
};

export default AdminOfficerDashBoard;