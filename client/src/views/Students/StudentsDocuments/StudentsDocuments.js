import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import './DocumentDisplay.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import DownloadButtonStudent from '../../../components/ZipDownLoaderButton/DownloadButtonStudent'


const StudentsDocuments = () => {
  let { state } = useLocation()
  console.log(state)
  const { studentId, counselorId } = useParams()
  const [applicants, setApplicants] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  console.log('applicants', applicants)
  const [applicantList, setApplicantList] = useState(state.app)
  console.log(applicantList)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-employee-list`)
      .then((res) => res.json())
      .then((data) => {
        let applicantsList = data.data.filter((item) => item.role === 'admin Officer')
        setApplicants(applicantsList)
      })
  }, [])

  const [selectedApplicant, setSelectedApplicant] = useState([])
  const handleApplicants = (e) => {
    const parsedValue = JSON.parse(e.target.value)
    console.log('e', parsedValue)
    setSelectedApplicant(parsedValue)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('selectedApplicant', selectedApplicant.id)
    axios
      .patch(
        `${process.env.REACT_APP_API_BASE_URL}/counselor/assign-student-to-applicant/${state.stdId}/${selectedApplicant.id}`,
        {
          applicant: selectedApplicant,
        },
      )
      .then((response) => {
        console.log(response.data.data)
        setApplicantList(response.data.data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Student Assigned to ${response.data.data[1].applicant_name} Successfully`,
          showConfirmButton: false,
          timer: 1500,
        })
        setIsSubmitted(true)
      })
      .catch((error) => console.error(error))
  }
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(state)
  const { ssc, hsc, hons, masters, utilities } = state.sudentsDocuments

  const renderDocumentStatus = (field, label) => {
    return field ? (
      <p>
        {label}:{' '}
        <a href={field} target="_blank" rel="noopener noreferrer">
          View Document
        </a>
      </p>
    ) : (
      <p>
        {label}: <span style={{ color: 'red' }}>Not Submitted</span>
      </p>
    )
  }

  return (
    <section className="my-5 container showDocuments">
      <section>
        <div>
          <h1>Student Details</h1>
          <p>Counselor ID: {state.sudentsDocuments.counselorId}</p>

          <h2>SSC</h2>
          {renderDocumentStatus(state.sudentsDocuments.ssc?.sscCertificate, 'SSC Certificate')}
          {renderDocumentStatus(state.sudentsDocuments.ssc?.sscTranscript, 'SSC Transcript')}

          <h2>HSC</h2>
          {renderDocumentStatus(state.sudentsDocuments.hsc?.hscCertificate, 'HSC Certificate')}
          {renderDocumentStatus(state.sudentsDocuments.hsc?.hscTranscript, 'HSC Transcript')}
          {renderDocumentStatus(state.sudentsDocuments.hsc?.hscRecommendation, 'HSC Recommendation')}

          <h2>Hons</h2>
          {renderDocumentStatus(state.sudentsDocuments.hons?.honsCertificate, 'Hons Certificate')}
          {renderDocumentStatus(state.sudentsDocuments.hons?.honsTranscript, 'Hons Transcript')}
          {renderDocumentStatus(state.sudentsDocuments.hons?.honsRecommendation, 'Hons Recommendation')}

          <h2>Masters</h2>
          {renderDocumentStatus(state.sudentsDocuments.masters?.mscCertificate, 'Masters Certificate')}
          {renderDocumentStatus(state.sudentsDocuments.masters?.mscTranscript, 'Masters Transcript')}
          {renderDocumentStatus(
            state.sudentsDocuments.masters?.mscRecommendation,
            'Masters Recommendation',
          )}

          <h2>Utilities</h2>
          {renderDocumentStatus(state.sudentsDocuments.utilities?.ielts, 'IELTS')}
          {renderDocumentStatus(state.sudentsDocuments.utilities?.cv, 'CV')}
          {renderDocumentStatus(state.sudentsDocuments.utilities?.passport, 'Passport')}
          {renderDocumentStatus(state.sudentsDocuments.utilities?.extraCA, 'Extra Curricular Activities')}
          {renderDocumentStatus(state.sudentsDocuments.utilities?.bankSolvency, 'Bank Solvency')}
        </div>
        <div>
          {
            console.log(state.sudentsDocuments.studentId)
          }
          <DownloadButtonStudent studentId={state.sudentsDocuments.studentId}></DownloadButtonStudent>
        </div>
      </section>

      {console.log('applicantList', applicantList)}
      {applicantList?.length > 1 && (
        <h3 className="text-center p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end">
          This Student is Assigned to{' '}
          {applicantList?.map((element) => (
            <p className="text-danger">{element.applicant_name}</p>
          ))}{' '}
          For Application
        </h3>
      )}
      {user.role == 'Super Admin' || user.role == 'Counselor' ? (
        <form onSubmit={handleSubmit}>
          <div className="form-row mt-4">
            <div className="form-group">
              <label htmlFor="counselor">Assign To a Applicant's : </label>
              <select id="applicants" name="applicants" onChange={handleApplicants}>
                <option>Choose One Applicant</option>
                {applicants.map((item) => (
                  <option
                    key={item.employee_id}
                    value={JSON.stringify({
                      id: item._id,
                      applicantId: item.employee_id,
                      applicant_name: item.name,
                    })}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn2" disabled={isSubmitted}>
            Assign
          </button>
        </form>
      ) : (
        ''
      )}

      {user.role === 'admin Officer' && (
        <section className="d-flex">
          <button className="btn btn2 m-auto">
            <Link
              to={`/admin-officer/update-application-status/${studentId}/${counselorId}/${user.employee_id}`}
              state={state.stdId}
            >
              {' '}
              Start Processing{' '}
            </Link>
          </button>
        </section>
      )}
      {state.app.length > 1
        ? user.role === 'Super Admin' && (
          <section className="d-flex">
            <button className="btn btn2 m-auto">
              <Link
                to={`/super-admin/update-application-status/${studentId}/${counselorId}/${state.app[1].applicantId}`}
                state={state.stdId}
              >
                {' '}
                Start Processing{' '}
              </Link>
            </button>
          </section>
        )
        : ''}
      {state.app.length > 1
        ? user.role === 'Admin Office Visa Section' && (
          <section className="d-flex">
            <button className="btn btn2 m-auto">
              <Link
                to={`/visa-process/all-university-documents/${studentId}/${counselorId}/${state.app[1].applicantId}`}
                state={state.stdId}
              >
                {' '}
                Get Documents{' '}
              </Link>
            </button>
          </section>
        )
        : ''}
    </section>
  )
}

export default StudentsDocuments
