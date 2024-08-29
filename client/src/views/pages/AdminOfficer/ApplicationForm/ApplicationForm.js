import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const ApplicationForm = () => {
  let { state } = useLocation()
  const { studentId, counselorId, applicantId } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [universityInfo, setUniversityInfo] = useState([])
  const [reducervalue, forceUpdate] = useReducer((x) => x + 1, 0)
  console.log('studentId', state)
  let allUniversities = []
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/applicant/university-upload/${studentId}/${counselorId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('okkkkkkkkkk', data)
        const obj = data?.data
        console.log(obj)
        obj?.forEach((doc) => {
          // Concatenate the universities array of the current document to allUniversities
          allUniversities = allUniversities.concat(doc.universities)

          // console.log(allUniversities);
        })
        setUniversityInfo(allUniversities)
      })
  }, [reducervalue])

  const [formData, setFormData] = useState({
    universityName: '',
    subject: '',
    country: '',
    intake: '',
    note: '',
    b2b: '',
    link: '',
  })
  console.log(studentId, counselorId, applicantId)

  const handleInputChange = (e) => {
    e.preventDefault()

    let { name, value } = e.target
    value = value.replace(/ /g, '_')
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    console.log('formData', formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit', formData)
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/applicant/university-upload/${studentId}/${counselorId}/${applicantId}`,
        formData,
      )
      .then((result) => {
        // console.log(result);
        forceUpdate()
        if (result) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Status Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
          })
          // navigate('student/student-list')
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    console.log('handleUpdate', formData)
    axios
      .patch(
        `${process.env.REACT_APP_API_BASE_URL}/applicant/university-upload/${studentId}/${counselorId}/${applicantId}`,
        formData,
      )
      .then((result) => {
        // Update the state with the new list of universities

        if (result) {
          forceUpdate()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'University Application Successful',
            showConfirmButton: false,
            timer: 1500,
          })
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <h4 className="text-center mb-5">Applied University List</h4>
      <>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead className="text-nowrap">
            <CTableRow>
              <CTableHeaderCell className="bg-body-tertiary text-center">Country</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                University Name
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Intake</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Subject</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                B2B Agent
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Link</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Note</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {universityInfo &&
              universityInfo.map((item, index) => {
                return (
                  <CTableRow v-for="item in tableItems" key={index}>
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
                      <div>{item.subject}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.b2b}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>
                        {item.link ? (
                          <Link to={item.link}>{item?.link?.substring(0, 12) + '...'}</Link>
                        ) : (
                          'N/A'
                        )}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.note}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {user.role === 'admin Officer' ? (
                        <button className="btn btn3">
                          <Link
                            to={`/admin-officer/assign-visa-team/${studentId}/${counselorId}/${applicantId}`}
                            state={{ item: item, studentObjectId: state }}
                          >
                            {' '}
                            Proceed{' '}
                          </Link>
                        </button>
                      ) : (
                        <button className="btn btn3">
                          <Link
                            to={`/super-admin/assign-visa-team/${studentId}/${counselorId}/${applicantId}`}
                            state={{ item: item, studentObjectId: state }}
                          >
                            {' '}
                            Proceed{' '}
                          </Link>
                        </button>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
      </>

      <div className="authorForm">
        <div className="authorContainer border border-secondary pb-5">
          <h4 className=" text-center my-4">Add New Applied University</h4>
          <form>
            <div className="d-flex justify-content-around mb-3">
              <div>
                <label className="mt-3 text-dark">
                  <strong>Country : </strong>{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Country"
                  name="country"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="mt-3 text-dark">
                  <strong>University Name : </strong>{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="University Name..."
                  name="universityName"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="mt-3 text-dark">
                  <strong>Intake : </strong>{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Intake"
                  name="intake"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="mt-3 text-dark">
                  <strong>Subject : </strong>{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="mt-3 text-dark">
                  <strong>B2B agent : </strong>{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="b2b"
                  name="b2b"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="mt-3 text-dark">
                  <strong>Application Link : </strong>{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="link"
                  name="link"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="mt-3 text-dark">
                  <strong>Note : </strong>{' '}
                </label>
                <textarea
                  style={{ height: '100px' }}
                  className="form-control"
                  type="text"
                  placeholder="Note"
                  name="note"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {universityInfo?.length ? (
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleUpdate}
                  className="add btn btn2 d-flex align-items-center"
                >
                  <strong className="mx-auto">Add</strong>
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-around">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="add btn btn3 d-flex align-items-end"
                >
                  <strong className="mx-auto">Add</strong>
                </button>
              </div>
            )}
          </form>
        </div>
        
      </div>
    </div>
  )
}

export default ApplicationForm
