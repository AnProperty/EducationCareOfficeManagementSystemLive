import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './NessecaryStudentDocuments.css'
import visaTeamServices from '../../../../components/httpservices/visaTeamServices/visaTeamServices'
import DownloadButtonUniDOcs from '../../../../components/ZipDownLoaderButton/DownloadButtonUniDocs'

const NessecaryStudentDocuments = () => {
  const { studentId, counselorId, applicantId } = useParams()
  const params = useParams()
  console.log("9999999999999999999999",params);
  const [docs, setDocs] = useState([])
  const visaTeam = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/visa/get-all-visa-pros-docs/${applicantId}/${studentId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setDocs(data?.data)
      })
  }, [])

  const handleVisaStatusSuccess = async (date) => {
    const res = await visaTeamServices.updateStatus(studentId,date, 'success')
  }

  const handleVisaStatusRejected = async (date) => {
    const res = await visaTeamServices.updateStatus(studentId,date, 'rejected')
  }

  const renderFieldStatus = (field, label) => {
    return field ? (
      <p>
        {label}:{' '}
        <a href={field} target="_blank" rel="noopener noreferrer">
          View Document
        </a>
      </p>
    ) : (
      <p>
        {label}: <span className="missing">Not Submitted</span>
      </p>
    )
  }

  return (
    <div>
      {console.log('//////////////////////////////////', docs)}
      {docs.length ? (
        <div className="card documents">
          <div className="card-header">
            <h2>Student Information</h2>
          </div>
          <div className="applicant-details">
            {docs.map((applicant, index) => (
              <div key={index} className="applicant-card">
                <h2>Applicant {index + 1}</h2>
                <p>Applicant ID: {applicant.applicantId}</p>
                <p>Counselor ID: {applicant.counselorId}</p>
                <p>Country: {applicant.country}</p>
                <p>Created At: {new Date(applicant.createdAt).toLocaleString()}</p>
                <p>Intake: {applicant.intake}</p>
                <p>Note: {applicant.note}</p>
                <p>Student ID: {applicant.studentId}</p>
                <p>Subject: {applicant.subject}</p>
                <p>B2B Agent: {applicant.b2b}</p>
                <p>Link: {applicant.link}</p>
                <p>University Name: {applicant.universityName}</p>
                <p>Visa Team Name: {applicant.visaTeamName}</p>

                {renderFieldStatus(applicant.offerLetter, 'Offer Letter')}
                {renderFieldStatus(applicant.swiftCopy, 'Swift Copy')}
                {renderFieldStatus(applicant.universityPaymentRecept, 'University Payment Receipt')}
                {renderFieldStatus(applicant.dol, 'DOL')}
                {renderFieldStatus(applicant.pal, 'PAL')}
                {renderFieldStatus(applicant.loa, 'LOA')}
                <div className="d-flex justify-content-around my-3">
                  <DownloadButtonUniDOcs
                    applicantId={applicant.applicantId}
                    studentId={studentId}
                  />
                </div>
                <div className="d-flex justify-content-around">
                  <button className="btn btn2" onClick={()=>handleVisaStatusSuccess(applicant.createdAt)}>
                    Successful
                  </button>
                  <button className="btn btn3" onClick={()=>handleVisaStatusRejected(applicant.createdAt)}>
                    Rejected
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2>No Documents</h2>
      )}
    </div>
  )
}

export default NessecaryStudentDocuments
