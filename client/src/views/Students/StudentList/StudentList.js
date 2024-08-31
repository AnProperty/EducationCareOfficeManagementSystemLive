/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
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
import { cilPeople, cilTrash } from '@coreui/icons'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import axios from 'axios'

const StudentList = () => {
    const [studentList, setStudentList] = useState([])
    const [suggestions, setSuggestions] = useState([]) // State to store suggestions

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-student-list`)
            .then((res) => res.json())
            .then((data) => setStudentList(data.data))
    }, [])

    // Pagination
    const [pageNumber, setPageNumber] = useState(0)
    const papersPerPage = 10
    const paperVisited = pageNumber * papersPerPage
    const paginatePaper = studentList.slice(paperVisited, paperVisited + papersPerPage)

    const pageCount = Math.ceil(studentList.length / papersPerPage)
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected)
    }

    // Filter states
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [status, setStatus] = useState('')
    const [fullName, setFullName] = useState('') // New state for full name

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

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
                `${process.env.REACT_APP_API_BASE_URL}/super-admin/filter-leads?${query.toString()}`,
            )
            setStudentList(response.data)
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
                `${process.env.REACT_APP_API_BASE_URL}/utilities/download-leads?${query.toString()}`,
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
                    `${process.env.REACT_APP_API_BASE_URL}/super-admin/get-student-suggestion?fullName=${value}`,
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

    // Function to handle delete with confirmation
    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/super-admin/delete-student/${studentId}/${user._id}`)
                setStudentList(studentList.filter((student) => student._id !== studentId)) // Update list
            } catch (error) {
                console.error('Error deleting the student:', error)
            }
        }
    }


    return (
        <>
            <section>
                <div className="d-flex justify-content-between align-items-end my-4">
                    <div className="">
                        <label>Status : </label>
                        <select id="status" name="status" onChange={handleStatus}>
                            <option value="">Choose a status</option>
                            <option value="follow-up">Follow-Up</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="application-processing">Application-processing</option>
                            <option value="visa-processing">visa-processing</option>
                            <option value="success">Success</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="">
                        <label>Full Name:</label>
                        <div className='relative flex-1'>

                            <input
                                type="text"
                                value={fullName}
                                placeholder="Enter full name"
                                onChange={handleFullNameChange}
                            />
                            {suggestions.length > 0 && (
                                <ul className="suggestions-list bg-white border border-gray-300 w-full rounded mt-1 max-h-40 overflow-y-auto z-20 position-absolute">
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
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow className="text-center">
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                            <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                            Phone Number
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Address</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">More info</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Delete</CTableHeaderCell> {/* New Delete Column */}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {paginatePaper.map((item, index) => {
                        return (
                            <CTableRow v-for="item in tableItems" key={index} className="text-center">
                                <CTableDataCell className="text-center">
                                    <div>{index + 1}</div>
                                    {console.log("uuuuuuuu",item)}
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.fullName}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.phoneNumber}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>
                                        {item.street},{item.city},{item.country}
                                    </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.email}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.status}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    {user.role === 'receptionist' ? (
                                        <Link
                                            to={`/receptionist/student-details/${item.studentId}/${item.counselor.employee_id}`}
                                            state={{ item: item }}
                                        >
                                            <button className="btn  btn-info bg-danger">More Info</button>
                                        </Link>
                                    ) : (
                                        <Link
                                            to={`/super-admin/student-details/${item.studentId}/${item.counselor.employee_id}`}
                                            state={{ item: item }}
                                        >
                                            <button className="btn  btn-info bg-danger">More Info</button>
                                        </Link>
                                    )}
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
            </CTable>

            <div className="ul-center my-3">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="NEXT >>"
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    previousLabel="<< previous"
                    containerClassName={'paginationBtn'}
                    previousLinkClassName={'PreviousBtn'}
                    nextLinkClassName={'nextBtn'}
                    disabledClassName={'paginationDisabled'}
                    activeClassName={'paginationActive'}
                />
            </div>
        </>
    )
}

export default StudentList
