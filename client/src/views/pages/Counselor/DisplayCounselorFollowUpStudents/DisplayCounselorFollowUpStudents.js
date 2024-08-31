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
    cilTrash,
} from '@coreui/icons';
import { Link } from 'react-router-dom';
import PreviousButton from '../../../../utilities/PreviousPage';
import axios from 'axios';

const DisplayCounselorFollowUpStudents = () => {
    const counselor = JSON.parse(localStorage.getItem('user'))

    const [counselorEnrolledStudent, setCounselorEnrolledStudent] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/utilities/filter-student-list/${counselor.employee_id}?status=follow-up`)
            .then((res) => res.json())
            .then((data) => setCounselorEnrolledStudent(data.data))
    }, [])

    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/utilities/delete-student/${studentId}/${counselor._id}`)
                setCounselorEnrolledStudent(counselorEnrolledStudent.filter((student) => student._id !== studentId)) // Update list
            } catch (error) {
                console.error('Error deleting the student:', error)
            }
        }
    }

    
    return (
        <div>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow className='text-center'>
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                            <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">StudentId</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Name</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Phone No</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">More info</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Delete</CTableHeaderCell>
                    </CTableRow>

                </CTableHead>
                <CTableBody>

                    {counselorEnrolledStudent?.map((item, index) => {
                        return (

                            <CTableRow v-for="item in tableItems" key={index} className='text-center'>
                                <CTableDataCell className="text-center">
                                    {console.log(item)}
                                    <div>{index + 1}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.studentId}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.fullName}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.phoneNumber}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.status}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <Link to={`/counselor/student-details/${item.studentId}/${counselor.employee_id}`} state={{ item: item }}><button className="button btn btn3">More Info</button></Link>
                                </CTableDataCell>
                                <CTableDataCell> {/* Delete Button Column */}
                                    <button className="btn3 btn-danger" onClick={() => handleDelete(item._id)}>
                                        <CIcon icon={cilTrash} />
                                    </button>
                                </CTableDataCell>
                            </CTableRow>

                        )
                    })}
                </CTableBody>
            </CTable >
            
        </div>
    );
};

export default DisplayCounselorFollowUpStudents;