/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import './EmployeeList.css'
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
import { Link } from 'react-router-dom'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-employee-list`)
      .then((res) => res.json())
      .then((data) => setEmployees(data.data))
  }, [])
  const filteredArray = employees.filter(item => item.employee_id !== "1")
  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">User</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Role</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Contact Number</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Employee ID</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">More info</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>

          {filteredArray.map((item, index) => {
            return (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <img
                    src={item.profilePic}
                    className="avater"
                  ></img>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.name}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.role}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.phone}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.employee_id}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <Link to={`/super-admin/employee/${item.employee_id}`} state={{ item: item }}><button className="btn btn3">More Info</button></Link>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default EmployeeList
