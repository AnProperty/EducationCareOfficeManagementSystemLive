import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import { Link } from 'react-router-dom'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])
  // console.log(props.allStudentsSize);


  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>

      <CCol sm={12} xl={3} xxl={4}>
        <Link to={"/super-admin/student/student-list"}>
          <CWidgetStatsA
            color="info"
            value={
              <>
                <h2 className="m-auto">Total Students</h2>
                <h3 className="m-auto">{props.allStudents.length}</h3>
              </>
            }

            chart={
              <CChartLine
                ref={widgetChartRef1}
                className="mt-3 mx-3"
                style={{ height: '70px' }}
              />
            }
          />
        </Link>
      </CCol>
      <CCol sm={12} xl={3} xxl={4}>
        <Link to={'/super-admin/student/enrolled-student-list'} state={props.enrolledStudents}>
          <CWidgetStatsA
            color="primary"
            value={
              <>
                <h2 className="m-auto">Enrolled Student</h2>
                <h3 className="m-auto">{props.enrolledStudents.length}</h3>
              </>
            }
            chart={
              <CChartLine
                ref={widgetChartRef2}
                className="mt-3 mx-3"
                style={{ height: '70px' }}
              />
            }
          />
        </Link>

      </CCol>
      <CCol sm={12} xl={3} xxl={4}>
        <Link to={'/super-admin/student/follow-up-student-list'} state={props.FollowUpStudents}>
          <CWidgetStatsA
            color="danger"
            value={
              <>
                <h2 className="m-auto">Follow Up</h2>
                <h3 className="m-auto">{props.FollowUpStudents.length}</h3>
              </>
            }
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: '70px' }}
              />
            }
          />
        </Link>

      </CCol>
      <CCol sm={12} xl={3} xxl={4}>
        <Link to={'/super-admin/student/application-processing-list'} state={props.ApplicationProcessingStudents}>
          <CWidgetStatsA
            color="secondary"
            value={
              <>
                <h2 className="m-auto">Application Processing</h2>
                <h3 className="m-auto">{props.ApplicationProcessingStudents.length}</h3>
              </>
            }
            chart={
              <CChartLine
                ref={widgetChartRef2}
                className="mt-3 mx-3"
                style={{ height: '70px' }}
              />
            }
          />
        </Link>

      </CCol>
      <CCol sm={12} xl={3} xxl={4}>
        <Link to={'/super-admin/student/visa-processing-list'} state={props.VisaProcessingStudents}>
          <CWidgetStatsA
            color="warning"
            value={
              <>
                <h2 className="m-auto">Visa Processing</h2>
                <h3 className="m-auto">{props.VisaProcessingStudents.length}</h3>
              </>
            }
            chart={
              <CChartLine
                ref={widgetChartRef2}
                className="mt-3 mx-3"
                style={{ height: '70px' }}
              />
            }
          />
        </Link>

      </CCol>
      <CCol sm={12} xl={3} xxl={4}>
        <Link to={'/super-admin/student/success'} state={props.SuccessStudents}>
          <CWidgetStatsA
            color="success"
            value={
              <>
                <h2 className="m-auto">Success</h2>
                <h3 className="m-auto">{props.SuccessStudents.length}</h3>
              </>
            }
            chart={
              <CChartLine
                ref={widgetChartRef2}
                className="mt-3 mx-3"
                style={{ height: '70px' }}
              />
            }
          />
        </Link>

      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
