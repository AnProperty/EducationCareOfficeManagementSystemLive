/* eslint-disable prettier/prettier */
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
import Pagination from '../../../../utilities/Pagination';
import axios from 'axios';

const StudentListFromWeb = () => {
    const [counselorStudent, setCounselorStudent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role === 'Counselor') {
        useEffect(() => {
            fetch(`https://api.gecare.co.uk/admin/counselor-student-profile-list/${user.employee_id}`)
                .then((res) => res.json())
                .then((data) => setCounselorStudent(data))


        }, [])
    } else {

        useEffect(() => {
            const fetchItems = async (page) => {
                const response = await axios.get(`https://api.gecare.co.uk/admin/enrolled-profile-list?page=${page}`);

                console.log(response);
                setCounselorStudent(response.data.profiles);
                setTotalPages(response.data.totalProfiles);
            };

            fetchItems(currentPage);
        }, [currentPage]);

    }
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
                                {
                                    user.role === 'Counselor' && <Link to={`/counselor/web-student-details/${item._id}`} state={{ item: item }}><button className="button btn btn3">More Info</button></Link>
                                }
                                {
                                    user.role === 'Super Admin' && <Link to={`/super-admin/web-student-details/${item._id}`} state={{ item: item }}><button className="button btn btn3">More Info</button></Link>
                                }
                                    
                                </CTableDataCell>
                            </CTableRow>

                        )
                    })}
                </CTableBody>
            </CTable >

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default StudentListFromWeb;