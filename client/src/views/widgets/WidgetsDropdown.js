import React from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol } from '@coreui/react'
import { Link } from 'react-router-dom'

const WidgetsDropdown = (props) => {
  const widgetData = [
    {
      title: 'Total Students',
      count: props.allStudents.length,
      color: 'bg-info',
      link: '/super-admin/student/student-list',
    },
    {
      title: 'Enrolled Students',
      count: props.enrolledStudents.length,
      color: 'bg-primary',
      link: '/super-admin/student/enrolled-student-list',
      state: props.enrolledStudents,
    },
    {
      title: 'Follow Up',
      count: props.FollowUpStudents.length,
      color: 'bg-danger',
      link: '/super-admin/student/follow-up-student-list',
      state: props.FollowUpStudents,
    },
    {
      title: 'Application Processing',
      count: props.ApplicationProcessingStudents.length,
      color: 'bg-secondary',
      link: '/super-admin/student/application-processing-list',
      state: props.ApplicationProcessingStudents,
    },
    {
      title: 'Visa Processing',
      count: props.VisaProcessingStudents.length,
      color: 'bg-warning',
      link: '/super-admin/student/visa-processing-list',
      state: props.VisaProcessingStudents,
    },
    {
      title: 'Success',
      count: props.SuccessStudents.length,
      color: 'bg-success',
      link: '/super-admin/student/success',
      state: props.SuccessStudents,
    },
  ]

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {widgetData.map((widget, index) => (
        <CCol sm={12} xl={3} xxl={4} key={index}>
          <Link to={widget.link} state={widget.state} className="widget-link">
            <div className={`widget-card ${widget.color} text-white`}>
              <div className="widget-card-body">
                <h3 className="widget-title" style={{"textDecorationColor":"white"}}>{widget.title}</h3>
                <h3 className="widget-count">{widget.count}</h3>
              </div>
            </div>
          </Link>
        </CCol>
      ))}
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  allStudents: PropTypes.array.isRequired,
  enrolledStudents: PropTypes.array.isRequired,
  FollowUpStudents: PropTypes.array.isRequired,
  ApplicationProcessingStudents: PropTypes.array.isRequired,
  VisaProcessingStudents: PropTypes.array.isRequired,
  SuccessStudents: PropTypes.array.isRequired,
}

export default WidgetsDropdown

// Add some custom CSS
const styles = `
.widget-card {
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}
.widget-card:hover {
  transform: translateY(-5px);
}
.widget-card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}
.widget-title {
  font-size: 24px; /* Larger text for the title */
  margin-bottom: 5px;
  color: white;
  text-decoration: none; /* Ensure no underline */
}
.widget-count {
  font-size: 40px; /* Smaller size for the number */
  font-weight: bold;
  color: white;
}
.widget-link {
  text-decoration: none; /* Remove underline from the entire link */
  color: inherit; /* Inherit color from parent */
}
.widget-link:hover .widget-title {
  text-decoration: none; /* Ensure title remains without underline on hover */
}
`

// Adding the styles to the document
const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
