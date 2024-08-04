import React, { useEffect, useState } from 'react';
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
    cilPeople,
} from '@coreui/icons';
import { Link } from 'react-router-dom';

const StudentListFromWeb = () => {
    const [counselorStudent, setCounselorStudent] = useState([]);
    const counselor = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        fetch(`http://localhost:8080/admin/counselor-student-profile-list/${counselor.employee_id}`)
            .then((res) => res.json())
            .then((data) => setCounselorStudent(data))
    }, [])
    return (
        <div>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow className='text-center'>
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                            <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Name</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Phone No</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Created Date</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">More info</CTableHeaderCell>
                    </CTableRow>

                </CTableHead>
                <CTableBody>

                    {counselorStudent?.map((item, index) => {
                        return (

                            <CTableRow v-for="item in tableItems" key={index} className='text-center'>
                                <CTableDataCell className="text-center">

                                    <div>{index + 1}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.general.name}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.general.phone}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.general.email}</div>
                                </CTableDataCell>
                                {console.log(counselorStudent)}
                                <CTableDataCell>
                                    <div>{item.createdAt}</div>
                                </CTableDataCell>

                                <CTableDataCell>
                                    <Link to={`/counselor/web-student-details/${item._id}`} state={{ item: item }}><button className="button btn btn3">More Info</button></Link>
                                </CTableDataCell>
                            </CTableRow>

                        )
                    })}
                </CTableBody>
            </CTable >
        </div>
    );
};

export default StudentListFromWeb;