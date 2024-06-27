import React, { useState } from 'react'
import axios from 'axios'
import './DocumentsUploadsForm.css'
import Swal from 'sweetalert2'
import studentsServices from '../../../components/httpservices/studentsServices/studentsServices'
import { useParams } from 'react-router-dom'

const DocumentsUploadsForm = () => {
  const { studentId, counselorId } = useParams()
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [documents, setDocuments] = useState({
    sscCertificate: '',
    sscTranscript: '',
    hscCertificate: '',
    hscTranscript: '',
    hscRecommendation: '',
    honsCertificate: '',
    honsTranscript: '',
    honsRecommendation: '',
    mscCertificate: '',
    mscTranscript: '',
    mscRecommendation: '',
    ielts: '',
    cv: '',
    passport: '',
    extraCA: '',
    bankSolvency: '',
    UniversityDocuments: {
      offerLetter: '',
      swiftCopy: '',
      universityPaymentRecept: '',
      loa: '',
      universityInfo: {
        universityName: '',
        subject: '',
        country: '',
        intake: '',
        note: '',
      },
    },
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
  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    // Object.keys(documents).map((item) => Data.append({item} , documents[item]))

    const Data = new FormData()

    Data.append(`sscCertificate`, documents.sscCertificate)
    Data.append(`sscTranscript`, documents.sscTranscript)
    Data.append(`hscCertificate`, documents.hscCertificate)
    Data.append(`hscTranscript`, documents.hscTranscript)
    Data.append(`hscRecommendation`, documents.hscRecommendation)
    Data.append(`honsCertificate`, documents.honsCertificate)
    Data.append(`honsTranscript`, documents.honsTranscript)
    Data.append(`honsRecommendation`, documents.honsRecommendation)
    Data.append(`mscCertificate`, documents.mscCertificate)
    Data.append(`mscTranscript`, documents.mscTranscript)
    Data.append(`mscRecommendation`, documents.mscRecommendation)
    Data.append(`bankSolvency`, documents.bankSolvency)
    Data.append(`extraCA`, documents.extraCA)
    Data.append(`passport`, documents.passport)
    Data.append(`ielts`, documents.ielts)
    Data.append(`cv`, documents.cv)
    Data.append(`studentId`, studentId)
    Data.append(`counselorId`, counselorId)
    Data.append(`UniversityDocuments`, documents.UniversityDocuments)

    // const response = await studentsServices.uploadDocuments(Data)
    // console.log(response);
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/student/add-documents/${studentId}/${counselorId}`,
        Data,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )
      .then((result) => {
        console.log(result)
        if (result) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Document Submitted Successfully',
            showConfirmButton: false,
            timer: 1500,
          })
          setIsSubmitted(true)
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false))
  }
  return (
    <div className="form-upload-container">
      <form class="container p-y-1" onSubmit={handleSubmit}>
        <h5 className="mt-3 mb-5 text-center">Please Upload Your Pending Documents</h5>

        <div class="row m-b-1">
          <h6 className="">S.S.C Documents : </h6>
          <div class="col-sm-6 offset-sm-3 forBlue forPaddingMargin">
            <div class="form-group inputDnD ">
              <label for="inputFile">Certificate</label>
              <input
                type="file"
                class="text-primary"
                placeholder="Upload Or Drag and drop"
                name="sscCertificate"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Transcript</label>
              <input
                type="file"
                class="text-primary font-weight-bold"
                data-title="Drag and drop a file"
                name="sscTranscript"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div class="row m-b-1 ">
          <h6>H.S.C Documents : </h6>
          <div class="col-sm-6 offset-sm-3 forGreen forPaddingMargin">
            <div class="form-group inputDnD">
              <label for="inputFile">Certificate</label>
              <input
                type="file"
                class="text-success font-weight-bold"
                name="hscCertificate"
                data-title="Drag and drop a file"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Transcript</label>
              <input
                type="file"
                class="text-success font-weight-bold"
                name="hscTranscript"
                data-title="Drag and drop a file"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Recommendation Letter</label>
              <input
                type="file"
                class="text-success font-weight-bold"
                name="hscRecommendation"
                data-title="Drag and drop a file"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div class="row m-b-1">
          <h6> Hon's Documents : </h6>
          <div class="col-sm-6 offset-sm-3 forYellow forPaddingMargin">
            <div class="form-group inputDnD">
              <label for="inputFile">Hon's Certificate</label>
              <input
                type="file"
                class="text-warning font-weight-bold"
                data-title="Drag and drop a file"
                name="honsCertificate"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Hon's Transcript</label>
              <input
                type="file"
                class="text-warning font-weight-bold"
                data-title="Drag and drop a file"
                name="honsTranscript"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Hon's Recommendation Letter</label>
              <input
                type="file"
                class="text-warning font-weight-bold"
                data-title="Drag and drop a file"
                name="honsRecommendation"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div class="row m-b-1">
          <h6>Msc Documents : </h6>
          <div class="col-sm-6 offset-sm-3 forRed forPaddingMargin">
            <div class="form-group inputDnD">
              <label for="inputFile">Masters Certificate</label>
              <input
                type="file"
                class="text-danger font-weight-bold"
                data-title="Drag and drop a file"
                name="mscCertificate"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Masters Transcript</label>
              <input
                type="file"
                class="text-danger font-weight-bold"
                data-title="Drag and drop a file"
                name="mscTranscript"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Masters Recommendation Letter</label>
              <input
                type="file"
                class="text-danger font-weight-bold"
                data-title="Drag and drop a file"
                name="mscRecommendation"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div class="row">
          <h6>Additional Documents : </h6>
          <div class="col-sm-6 offset-sm-3 forBlack forPaddingMargin">
            <div class="form-group inputDnD">
              <label for="inputFile">English Proficiency(If Available)</label>
              <input
                type="file"
                class="font-weight-bold"
                data-title="Drag and drop a file"
                name="ielts"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Add You CV(If Available)</label>
              <input
                type="file"
                class="font-weight-bold"
                data-title="Drag and drop a file"
                name="cv"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Passport</label>
              <input
                type="file"
                class="font-weight-bold"
                data-title="Drag and drop a file"
                name="passport"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Extra Curricular Activities</label>
              <input
                type="file"
                class="font-weight-bold"
                data-title="Drag and drop a file"
                name="extraCA"
                onChange={handleChange}
              />
            </div>
            <div class="form-group inputDnD">
              <label for="inputFile">Bank Solvency(If Available)</label>
              <input
                type="file"
                class="font-weight-bold"
                data-title="Drag and drop a file"
                name="bankSolvency"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <section className="my-1 d-flex justify-content-around">
          <button type="submit" className="btn btn2 w-50" disabled={isSubmitted}>
            {loading ? 'Submitting.....' : 'Submit'}
          </button>
        </section>
      </form>
    </div>
  )
}

export default DocumentsUploadsForm
