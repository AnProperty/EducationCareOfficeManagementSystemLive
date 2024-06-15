import React from 'react';

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibGoogle,
    cibFacebook,
    cibLinkedin,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
    cibTwitter,
    cilCloudDownload,
    cilPeople,
    cilUser,
    cilUserFemale,
} from '@coreui/icons'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { Link } from 'react-router-dom';

const TodaysStudents = ({ students }) => {
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
                                <Link to={`/super-admin/student-details/${item.studentId}/${item.counselor.employee_id
                                    }`} state={{ item: item }}><button className="btn  btn-info bg-danger">More Info</button></Link>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            
        </div>
    );
};

export default TodaysStudents;