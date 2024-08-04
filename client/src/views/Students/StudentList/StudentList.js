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
import axios from 'axios';

const StudentList = () => {
    const [studentList, setStudentList] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-student-list`)
            .then((res) => res.json())
            .then((data) => setStudentList(data.data))
    }, [])

    //pagination starts

    const [pageNumber, setPageNumber] = useState(0);
    const papersPerPage = 10;
    const paperVisited = pageNumber * papersPerPage;
    const paginatePaper = studentList.slice(paperVisited, paperVisited + papersPerPage);


    const pageCount = Math.ceil(studentList.length / papersPerPage);
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    }
    //pagination end




    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('follow-up');

    const handleStatus = (e) => {
        setStatus(e.target.value);
    };

    const getNextDayDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1); // Set date to the next day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const handleFilter = async () => {
        try {
            const query = new URLSearchParams();
            if (startDate) query.append('startDate', startDate);

            // Set endDate to next day date if not provided
            const finalEndDate = endDate || getNextDayDate();
            query.append('endDate', finalEndDate);

            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/super-admin/filter-leads/${status}?${query.toString()}`);
            setStudentList(response.data);
            // const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'data.xlsx'); // Specify the file name
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        } catch (error) {
            console.error('Error Filtering the file', error);
        }
    }

    const handleDownload = async () => {
        try {
            const query = new URLSearchParams();
            if (startDate) query.append('startDate', startDate);

            // Set endDate to next day date if not provided
            const finalEndDate = endDate || getNextDayDate();
            query.append('endDate', finalEndDate);

            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/utilities/download-leads/${status}?${query.toString()}`, {
                responseType: 'blob',
            });
            console.log("Response", response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.xlsx'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };

    return (
        <>
            <section>
                <div className='d-flex my-4 justify-content-evenly forDownloadLabel'>
                    <div className="d-flex align-items-center">
                        <label>Status</label>
                        <select id="status" name='status' onChange={handleStatus} >
                            <option value="follow-up">Follow-Up</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="application-processing">Application-processing</option>
                            <option value="visa-processing">visa-processing</option>
                            <option value="success">Success</option>
                            <option value="rejected">Rejected</option>

                        </select>
                    </div>
                    <div className='d-flex align-items-center'>
                        <label>Start Date:</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className='d-flex align-items-center'>
                        <label>End Date:</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className='align-items-center'>
                        <button className='btn btn2' onClick={handleFilter}>Filter</button>
                    </div>
                    <div className='align-items-center'>
                        <button className='btn btn4' onClick={handleDownload}>Download Leads</button>
                    </div>
                </div>
            </section>
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
                                    {
                                        user.role === 'receptionist' ? <Link to={`/receptionist/student-details/${item.studentId}/${item.counselor.employee_id
                                            }`} state={{ item: item }}><button className="btn  btn-info bg-danger">More Info</button></Link> :
                                            <Link to={`/super-admin/student-details/${item.studentId}/${item.counselor.employee_id
                                                }`} state={{ item: item }}><button className="btn  btn-info bg-danger">More Info</button></Link>
                                    }

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
