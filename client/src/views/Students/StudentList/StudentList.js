/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import './StudentList.css'
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
import ReactPaginate from 'react-paginate';
import DownloadFromSuperAdmin from '../../../components/DownloadLeads/DownloadFromSuperAdmin';

const StudentList = () => {
    const [studentList, setStudentList] = useState([])



    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-student-list`)
            .then((res) => res.json())
            .then((data) => setStudentList(data.data))
    }, [])



    const [pageNumber, setPageNumber] = useState(0);
    const papersPerPage = 10;
    const paperVisited = pageNumber * papersPerPage;
    const paginatePaper = studentList.slice(paperVisited, paperVisited + papersPerPage);


    const pageCount = Math.ceil(studentList.length / papersPerPage);
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    }


    return (
        <>
            <div>
                <DownloadFromSuperAdmin />
            </div>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow className='text-center'>
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                            <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Phone Number</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Address</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">More info</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {paginatePaper.map((item, index) => {

                        return (
                            <CTableRow v-for="item in tableItems" key={index} className='text-center'>
                                <CTableDataCell className="text-center">
                                    <div>{index + 1}</div>
                                    {
                                        console.log(item)
                                    }
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.fullName}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.phoneNumber}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.street},{item.city},{item.country}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.email}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.status}</div>
                                </CTableDataCell>
                                <CTableDataCell >
                                    <Link to={`/super-admin/student-details/${item.studentId}/${item.counselor.employee_id
                                        }`} state={{ item: item }}><button className="btn  btn-info bg-danger">More Info</button></Link>
                                </CTableDataCell>
                            </CTableRow>
                        )
                    })}
                </CTableBody>
            </CTable >

            <div className='ul-center my-3'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="NEXT >>"
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    previousLabel="<< previous"
                    containerClassName={"paginationBtn"}
                    previousLinkClassName={"PreviousBtn"}
                    nextLinkClassName={"nextBtn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}

                />
            </div>
        </>
    );
};

export default StudentList;