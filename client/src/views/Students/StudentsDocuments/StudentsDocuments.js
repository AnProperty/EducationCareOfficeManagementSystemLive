/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import './DocumentDisplay.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import DownloadButtonStudent from '../../../components/ZipDownLoaderButton/DownloadButtonStudent'
import PreviousButton from '../../../utilities/PreviousPage'


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
        console.log(data.data);
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
    <section className="mb-5 mt-2 container showDocuments">
      <section>
        <div>
          <h3 className='text-center'> Student Educational Documents </h3>
          <p>Counselor ID: {state.sudentsDocuments.counselorId}</p>

          <h2>SSC</h2>
          {renderDocumentStatus(state.sudentsDocuments?.sscCertificate, 'SSC Certificate')}
          {renderDocumentStatus(state.sudentsDocuments?.sscTranscript, 'SSC Transcript')}

          <h2>HSC</h2>
          {renderDocumentStatus(state.sudentsDocuments?.hscCertificate, 'HSC Certificate')}
          {renderDocumentStatus(state.sudentsDocuments?.hscTranscript, 'HSC Transcript')}
          {renderDocumentStatus(state.sudentsDocuments?.hscRecommendation, 'HSC Recommendation')}

          <h2>Hons</h2>
          {renderDocumentStatus(state.sudentsDocuments?.honsCertificate, 'Hons Certificate')}
          {renderDocumentStatus(state.sudentsDocuments?.honsTranscript, 'Hons Transcript')}
          {renderDocumentStatus(state.sudentsDocuments?.honsRecommendation, 'Hons Recommendation')}

          <h2>Masters</h2>
          {renderDocumentStatus(state.sudentsDocuments?.mscCertificate, 'Masters Certificate')}
          {renderDocumentStatus(state.sudentsDocuments?.mscTranscript, 'Masters Transcript')}
          {renderDocumentStatus(
            state.sudentsDocuments?.mscRecommendation,
            'Masters Recommendation',
          )}

          <h2>Utilities</h2>
          {renderDocumentStatus(state.sudentsDocuments?.ielts, 'IELTS')}
          {renderDocumentStatus(state.sudentsDocuments?.cv, 'CV')}
          {renderDocumentStatus(state.sudentsDocuments?.passport, 'Passport')}
          {renderDocumentStatus(state.sudentsDocuments?.extraCA, 'Extra Curricular Activities')}
          {renderDocumentStatus(state.sudentsDocuments?.bankSolvency, 'Bank Solvency')}
        </div>
        <div>
          <DownloadButtonStudent studentId={state.sudentsDocuments.studentId}></DownloadButtonStudent>
        </div>
      </section>

      {console.log('applicantList', applicantList)}
      {applicantList?.length > 1 && (
        <div className="p-3 border">
          <h5>
            Assigned Applicant List {' '} :
          </h5>
          {applicantList?.map((element, index) => (
            <h6 key={index} className="text-info text-center">{element.applicant_name}</h6>
          ))}{' '}
        </div>
      )}
      {user.role == 'Super Admin' || user.role == 'Counselor' ? (
        <form onSubmit={handleSubmit} className='border my-4 p-3'>
          <div className="form-row mt-4">
            <div className="form-group d-flex align-items-center">
              <div className='col-md-2'><label htmlFor="counselor">Assign To a Applicant's : </label></div>
              <div className='col-md-8'>
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

              <div className='col-md-2'>
                <button type="submit" className="btn btn2" disabled={isSubmitted}>
                  Assign
                </button>
              </div>
            </div>

          </div>
        </form>
      ) : (
        ''
      )}

      <div className='d-flex justify-content-between'>
        <PreviousButton />
        {user.role === 'admin Officer' && (
          <section className="d-flex">
            <button className="btn btn2 m-auto">
              <Link
                to={`/admin-officer/update-application-status/${studentId}/${counselorId}/${user.employee_id}`}
                state={state.stdId}
              >
                {' '}
                <button className='btn btn5'>Next &gt;&gt;</button>{' '}
              </Link>
            </button>
          </section>
        )}
        {state.app.length > 1
          ? user.role === 'Super Admin' && (
            <section className="d-flex">

              <Link
                to={`/super-admin/update-application-status/${studentId}/${counselorId}/${state.app[1].applicantId}`}
                state={state.stdId}
              >
                {' '}
                <button className='btn btn5'>Next &gt;&gt;</button>{' '}
              </Link>
            </section>
          )
          : ''}
        {state.app.length > 1
          ? user.role === 'Admin Office Visa Section' && (
            <section className="d-flex">
              <Link
                to={`/visa-process/all-university-documents/${studentId}/${counselorId}/${state.app[1].applicantId}`}
                state={state.stdId}
              >
                <button className='btn btn5'>Next &gt;&gt;</button>
              </Link>
            </section>
          )
          : ''}


      </div>
    </section>
  )
}

export default StudentsDocuments
