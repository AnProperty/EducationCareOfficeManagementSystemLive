import React, { useEffect, useState } from 'react'
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
const Commission = () => {
    const [commission, setCommission] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-commission-list`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setCommission(data.data)
            })
    }, [])
    return (
        <div>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                            <CIcon icon={cilPeople} /> StudentId
                        </CTableHeaderCell>

                        <CTableHeaderCell className="bg-body-tertiary text-center">Country</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">University Name</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Intake</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">B2B Agent</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Application Link</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Note</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>

                    {commission.map((item, index) => {

                        return (
                            <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell className="text-center">
                                    {item.studentId}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item.country}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item.universityName}</div>
                                </CTableDataCell>

                                <CTableDataCell className="text-center">
                                    <div>{item.intake}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item.b2b}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item.link ? item.link : "N/A"}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <div>{item.note}</div>
                                </CTableDataCell>

                            </CTableRow>
                        )
                    })}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default Commission;