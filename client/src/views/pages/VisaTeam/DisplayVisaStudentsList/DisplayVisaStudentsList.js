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
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const DisplayVisaStudentsList = ({VisaTeamStudent, setVisaTeamStudent}) => {
    const visaempl = JSON.parse(localStorage.getItem('user'))
    console.log("object", VisaTeamStudent);
    const [pageNumber, setPageNumber] = useState(0);
    const papersPerPage = 10;
    const paperVisited = pageNumber * papersPerPage;
    const paginatePaper = VisaTeamStudent.slice(paperVisited, paperVisited + papersPerPage);


    const pageCount = Math.ceil(VisaTeamStudent.length / papersPerPage);
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    }

    const [suggestions, setSuggestions] = useState([]) // State to store suggestions
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [status, setStatus] = useState('')
    const [fullName, setFullName] = useState('') // New state for full name



    const getNextDayDate = () => {
        const date = new Date()
        date.setDate(date.getDate() + 1) // Set date to the next day
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const handleFilter = async () => {
        try {
            const query = new URLSearchParams()

            // Append each filter if it has a value
            if (startDate) query.append('startDate', startDate)
            const finalEndDate = endDate || getNextDayDate()
            query.append('endDate', finalEndDate)
            if (fullName) query.append('fullName', fullName)

            // Append status only if it has a value
            if (status !== '') query.append('status', status)

            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/utilities/filter-student-list/${visaempl.employee_id}?${query.toString()}`,
            )

            console.log("sdddddddddddddddddd",response)
            setVisaTeamStudent(response.data.data)
        } catch (error) {
            console.error('Error filtering the student list:', error)
        }
    }

    const handleDownload = async () => {
        try {
            const query = new URLSearchParams()

            // Append each filter if it has a value
            if (startDate) query.append('startDate', startDate)
            const finalEndDate = endDate || getNextDayDate()
            query.append('endDate', finalEndDate)
            if (fullName) query.append('fullName', fullName)

            // Append status only if it has a value
            if (status !== '') query.append('status', status)

            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/utilities/download-leads/${visaempl.employee_id}?${query.toString()}`,
                {
                    responseType: 'blob',
                },
            )
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'data.xlsx') // Specify the file name
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (error) {
            console.error('Error downloading the file', error)
        }
    }

    const handleFullNameChange = async (e) => {
        const value = e.target.value
        setFullName(value)

        if (value) {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/utilities/get-student-suggestion/${visaempl.employee_id}?fullName=${value}`,
                )
                setSuggestions(response.data) // Set the suggestions state with the response data
            } catch (error) {
                console.error('Error fetching suggestions:', error)
            }
        } else {
            setSuggestions([]) // Clear suggestions if input is empty
        }
    }

    const handleSuggestionClick = (suggestedName) => {
        setFullName(suggestedName) // Set the input to the clicked suggestion
        setSuggestions([]) // Clear the suggestions
    }
    return (
        <div>
            <section>
                <div className="d-flex justify-content-between align-items-end my-4">

                    <div>
                        <label>Full Name:</label>
                        <div className='relative flex-1'>

                            <input
                                type="text"
                                value={fullName}
                                placeholder="Enter full name"
                                onChange={handleFullNameChange}
                            />
                            {suggestions.length > 0 && (
                                <ul className="suggestions-list bg-white border border-gray-300 w-full rounded mt-1 max-h-40 overflow-y-auto z-2 position-absolute">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="">
                        <label>Start Date:</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="">
                        <label>End Date:</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className='d-flex mb-1'>
                        <div className="align-items-center">
                            <button className="btn btn2" onClick={handleFilter}>
                                Filter
                            </button>
                        </div>
                        <div className="align-items-center">
                            <button className="btn btn4" onClick={handleDownload}>
                                Download Leads
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow className='text-center'>
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                            <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">StudentId</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Name</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Phone No</CTableHeaderCell>
                        {/* <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell> */}
                        <CTableHeaderCell className="bg-body-tertiary">More info</CTableHeaderCell>
                    </CTableRow>
                    {/* {
                        console.log("000000000",applicantStudent.status)
                    } */}
                </CTableHead>
                <CTableBody>

                    {paginatePaper?.map((item, index) => {
                        return (

                            <CTableRow v-for="item in tableItems" key={index} className='text-center'>
                                <CTableDataCell className="text-center">
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
                                    <Link to={`/visa-process/student-details/${item.studentId}/${item.counselor.employee_id}`} state={{ item: item }}><button className="button btn btn3">More Info</button></Link>
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
        </div>
    );
};

export default DisplayVisaStudentsList;