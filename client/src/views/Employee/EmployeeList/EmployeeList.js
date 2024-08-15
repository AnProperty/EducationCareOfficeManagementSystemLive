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
      .then((data) => {
        // Create a Map to store unique emails and their corresponding objects
        const uniqueEmailMap = new Map();

        data.data.forEach((employee) => {
          // Check if the email already exists in the map
          if (!uniqueEmailMap.has(employee.email)) {
            uniqueEmailMap.set(employee.email, employee);
          }
        });

        // Convert the Map values to an array
        const uniqueEmailArray = Array.from(uniqueEmailMap.values());

        // Set the employees state with the unique email array
        setEmployees(uniqueEmailArray);
      })
      .catch((error) => {
        console.error("Error fetching employee list:", error);
      });
  }, []);
  const filteredArray = employees.filter(item => item.employee_id !== "1")
  return (
    <>
      <CTable className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              <CIcon icon={cilPeople} />
              {
                console.log(employees)
              }
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Contact Number</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Employee ID</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">More info</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>

          {filteredArray.map((item, index) => {
            return (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center me-2">
                  <img
                    src={item.profilePic}
                    className="avater"
                  ></img>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.name}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.phone}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.employee_id}</div>
                </CTableDataCell>
                <CTableDataCell>
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
