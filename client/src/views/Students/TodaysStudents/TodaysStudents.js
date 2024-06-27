import React from 'react';

import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilPeople,
} from '@coreui/icons'

import { Link } from 'react-router-dom';

const TodaysStudents = ({ students }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <div>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                            <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">User</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Country</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Counselor</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Status</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">More Info</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {students.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                            <CTableDataCell className="text-center">{item.fullName}</CTableDataCell>
                            <CTableDataCell className="text-center">{item.country}</CTableDataCell>
                            <CTableDataCell className="text-center">{item.counselor.employee_name ? item.counselor.employee_name : "empty"}</CTableDataCell>
                            <CTableDataCell className="text-center">{item.status ? item.status : '0'}</CTableDataCell>
                            <CTableDataCell className="text-center">
                                {
                                    user.role === "receptionist" ? (
                                        <Link to={`/receptionist/student-details/${item.studentId}/${item.counselor.employee_id
                                            }`} state={{ item: item }}><button className="btn  btn-info bg-danger">More Info</button></Link>
                                    ) : (
                                        <Link to={`/super-admin/student-details/${item.studentId}/${item.counselor.employee_id
                                            }`} state={{ item: item }}><button className="btn  btn-info bg-danger">More Info</button></Link>
                                    )
                                }
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>


        </div>
    );
};

export default TodaysStudents;
