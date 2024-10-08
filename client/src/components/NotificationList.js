import React from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle } from '@coreui/icons'
import './NotificationList.css'
import axios from 'axios'

const NotificationList = ({ notifications, markAsRead }) => {
  const navigate = useNavigate()

  const handleRowClick = async (studentId, employeeId, counselorId, task) => {


    console.log(studentId, employeeId, counselorId);

    const details = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/student/${studentId}`,
    )



    console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRR', details.data.data);


    if (task === "counseling") {
      navigate(`/counselor/student-details/${studentId}/${employeeId}`, { state: { item: details.data.data[0] } });
    } else if (task === "application") {
      navigate(`/admin-officer/student-details/${studentId}/${counselorId}`, { state: { item: details.data.data[0] } });
    } else {
      navigate(`/visa-process/student-details/${studentId}/${counselorId}`, { state: { item: details.data.data[0] } });

    }
  }

  return (
    <CCard className="w-100">
      <CCardHeader>
        <h5 className="m-0">Notifications</h5>
      </CCardHeader>
      <CCardBody>
        {notifications.length === 0 ? (
          <p className="text-center text-muted">No notifications</p>
        ) : (
          notifications.map(notification => (
            <div
              key={notification._id}
              className={`d-flex justify-content-between align-items-center p-2 mb-2 rounded ${notification.isRead ? 'bg-light' : 'bg-warning-light'}`}
              onClick={() => handleRowClick(notification.studentId, notification.employeeId, notification.counselorId, notification.for)}
              style={{ "width": "30rem" }}
            >
              <CCardText className="m-0" style={{ "color": "black" }}>{notification.message}</CCardText>
              {!notification.isRead && (
                <CButton
                  color="primary"
                  size="sm"
                  className="mt-2 d-flex align-items-center fancy-mark-read-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    markAsRead(notification._id)
                  }}
                >
                  <CIcon icon={cilCheckCircle} className="me-1" />
                  Mark as read
                </CButton>
              )}
            </div>
          ))
        )}
      </CCardBody>
    </CCard>
  )
}

export default NotificationList
