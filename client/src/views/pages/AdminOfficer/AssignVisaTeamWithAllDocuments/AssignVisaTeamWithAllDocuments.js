import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const AssignVisaTeamWithAllDocuments = () => {
  let { state } = useLocation()
  delete state.item._id
  console.log('frontend state   ', state)
  const { studentId, counselorId, applicantId } = useParams()
  const [universityDocs, setUniversityDocs] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { universityName, subject, country, intake,b2b,link } = state.item
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/applicant/get-uploaded-documents/${studentId}/${country}/${universityName}/${subject}/${intake}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setUniversityDocs(data.data)
        console.log(data.data)
        // universityDocs? setIsSubmitted(true):setIsSubmitted(false)
      })
  }, [])

  const [visaTeam, setVisaTeam] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-employee-list`)
      .then((res) => res.json())
      .then((data) => {
        let VisaTeam = data.data.filter((item) => item.role === 'Admin Office Visa Section')
        setVisaTeam(VisaTeam)
      })
  }, [])

  const [documents, setDocuments] = useState({
    studentId: studentId,
    counselorId: counselorId,
    applicantId: applicantId,
    //uniInfo
    universityName: state.item.universityName,
    country: state.item.country,
    intake: state.item.intake,
    note: state.item.note,
    subject: state.item.subject,
    b2b: state.item.b2b,
    link: state.item.link,
    ///
    offerLetter: '',
    swiftCopy: '',
    universityPaymentRecept: '',
    loa: '',
    dol: '',
    pal: '',
    visaTeamName: '',
    visaTeamId: '',

    status: "visa-processing"
  })

  const handleChange = (e) => {
    e.preventDefault()

    const { name, files } = e.target
    setDocuments((prevData) => ({
      ...prevData,
      [name]: files[0],
    }))

    console.log('documents', documents)
  }
  const handleVisaTeam = (e) => {
    const parsedValue = JSON.parse(e.target.value)
    console.log('e', parsedValue)
    setDocuments({
      ...documents,
      visaTeamName: parsedValue.employee_name,
      visaTeamId: parsedValue.employeeId,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('documents From Submit', documents)

    // Object.keys(documents).map((item) => Data.append({item} , documents[item]))

    const Data = new FormData()

    Object.keys(documents).forEach((key) => {
      if (documents[key]) {
        Data.append(key, documents[key])
      }
    })

    if (
      !(universityDocs?.offerLetter) &&
      !(universityDocs?.swiftCopy) &&
      !(universityDocs?.universityPaymentRecept) &&
      !(universityDocs?.loa) &&
      !(universityDocs?.dol) &&
      !(universityDocs?.pal)
    ) {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/applicant/upload-all-university-document/${studentId}/${counselorId}/${applicantId}/${state.studentObjectId}`,
          Data,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        )
        .then((result) => {
          console.log('resulttttttttttttttt  :', result)
          if (result) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Student Created Successfully',
              showConfirmButton: false,
              timer: 1500,
            })
            setIsSubmitted(true)
          } else {
            alert(result.data.Error)
          }
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: `${err}`,
            showConfirmButton: false,
            timer: 1500,
          })
        })
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_BASE_URL}/applicant/get-uploaded-documents/${studentId}/${country}/${universityName}/${subject}/${intake}/${state.studentObjectId}`,
          Data,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        )
        .then((result) => {
          console.log('resulttttttttttttttt  :', result)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Docs Upload Successful',
            showConfirmButton: false,
            timer: 1500,
          })
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Docs Upload Successful`,
            showConfirmButton: false,
            timer: 1500,
          })
        })
    }
  }
  return (
    <div>
      <div className="form-upload-container">
        <form class="container p-y-1" onSubmit={handleSubmit}>
          <h5 className="mt-3 mb-5 text-center">Please Upload All The Documents From University</h5>
          {universityDocs ? (
            <h4 className="text-center">
              This Student is already assigned to{' '}
              <strong className="text-danger">{universityDocs.visaTeamName}</strong>
            </h4>
          ) : (
            ''
          )}
          <div class="row m-b-1">
            <div class="col-sm-6 offset-sm-3 forBlue forPaddingMargin">
              <div class="form-group inputDnD ">
                <label for="inputFile">OfferLetter</label>
                {universityDocs?.offerLetter ? (
                  <Link to={universityDocs?.offerLetter}>Show OfferLetter</Link>
                ) : (
                  <input
                    type="file"
                    class="text-primary"
                    placeholder="Upload Or Drag and drop"
                    name="offerLetter"
                    onChange={handleChange}
                  />
                )}
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">Swift Copy</label>
                {universityDocs?.swiftCopy ? (
                  <Link to={universityDocs?.swiftCopy}>Show SwiftCopy</Link>
                ) : (
                  <input
                    type="file"
                    class="text-primary font-weight-bold"
                    data-title="Drag and drop a file"
                    name="swiftCopy"
                    onChange={handleChange}
                  />
                )}
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">University Payment Recept</label>
                {universityDocs?.universityPaymentRecept ? (
                  <Link to={universityDocs?.universityPaymentRecept}>
                    Show universityPaymentRecept
                  </Link>
                ) : (
                  <input
                    type="file"
                    class="text-success font-weight-bold"
                    name="universityPaymentRecept"
                    data-title="Drag and drop a file"
                    onChange={handleChange}
                  />
                )}
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">Letter Of Acceptance</label>
                {universityDocs?.loa ? (
                  <Link to={universityDocs?.loa}>Show Letter of Attestation</Link>
                ) : (
                  <input
                    type="file"
                    class="text-success font-weight-bold"
                    name="loa"
                    data-title="Drag and drop a file"
                    onChange={handleChange}
                  />
                )}
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">Deferred Offer Letter</label>
                {universityDocs?.dol ? (
                  <Link to={universityDocs?.dol}>Show Deferred Offer Letter</Link>
                ) : (
                  <input
                    type="file"
                    class="text-success font-weight-bold"
                    name="dol"
                    data-title="Drag and drop a file"
                    onChange={handleChange}
                  />
                )}
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">I20/ COE'S / PAL</label>
                {universityDocs?.pal ? (
                  <Link to={universityDocs?.pal}>Show I20/ COE'S / PAL</Link>
                ) : (
                  <input
                    type="file"
                    class="text-success font-weight-bold"
                    name="pal"
                    data-title="Drag and drop a file"
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="form-row mt-4">
            <div className="form-group">
              <label htmlFor="counselor">VisaTeam Name</label>
              <select id="counselor" name="counselor" onChange={handleVisaTeam}>
                <option>Choose One</option>
                {visaTeam.map((item) => (
                  <option
                    key={item.employee_id}
                    value={JSON.stringify({
                      id: item._id,
                      employeeId: item.employee_id,
                      employee_name: item.name,
                    })}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <section className="my-1 d-flex justify-content-around">
            <button type="submit" className="btn btn2" disabled={isSubmitted}>
              {' '}
              Submit{' '}
            </button>
          </section>
        </form>
      </div>
    </div>
  )
}

export default AssignVisaTeamWithAllDocuments
