import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './DocumentsUploadsForm.css'
import { useParams } from 'react-router-dom'
import { CButton, CCol, CFormInput, CListGroup, CListGroupItem, CRow, CSpinner } from '@coreui/react'

const DocumentsUploadsForm = () => {

  const filesArray = ['sscCertificate','sscTranscript','hscCertificate','hscTranscript','hscRecommendation','honsCertificate','honsTranscript','honsRecommendation','mscCertificate','mscTranscript','mscRecommendation','ielts','cv','passport','extraCA','bankSolvency'];
  
  const [uploading, setUploading] = useState(
    { sscCertificate: false,
      sscTranscript: false,
      hscCertificate: false,
      hscTranscript: false,
      hscRecommendation: false,
      honsCertificate: false,
      honsTranscript: false,
      honsRecommendation: false,
      mscCertificate: false,
      mscTranscript: false,
      mscRecommendation: false,
      ielts: false,
      cv: false,
      passport: false,
      extraCA: false,
      bankSolvency: false,
    });
  const { studentId, counselorId } = useParams()
  const [documents, setDocuments] = useState(
    { sscCertificate: null,
      sscTranscript: null,
      hscCertificate: null,
      hscTranscript: null,
      hscRecommendation: null,
      honsCertificate: null,
      honsTranscript: null,
      honsRecommendation: null,
      mscCertificate: null,
      mscTranscript: null,
      mscRecommendation: null,
      ielts: null,
      cv: null,
      passport: null,
      extraCA: null,
      bankSolvency: null,
    }
  );

  const fetchUploadedDocuments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/student/get-documents/${studentId}`);
      console.log(response?.data?.data);
      setDocuments(response?.data?.data);
    } catch (error) {
      console.error('Error fetching uploaded documents:', error);
    }
  };

  useEffect(() => {
    
    fetchUploadedDocuments();
  }, [studentId]);

  const handleDocumentUpload = (updatedDocuments) => {
    setDocuments(updatedDocuments);
  };

  const handleFileChange = (docType, event) => {
    const updatedDocument = { ...documents, [docType]: event.target.files[0] };
    handleDocumentUpload(updatedDocument);
  };

  const handleUpload = async (docType) => {
    const file = documents[docType];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // Ensure the key is 'file' as per backend expectation
    formData.append('documentName', docType);

    try {
      setUploading({ ...uploading, [docType]: true });
      // Replace with your actual API endpoint
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/student/add-documents/${studentId}/${counselorId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res)

      // Update document status to 'Uploaded'
      setDocuments({ ...documents, [docType]: res.data.data.docType });
      fetchUploadedDocuments();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading({ ...uploading, [docType]: false });
    }
  };

  const handleViewDocument = (file) => {
    if (typeof file === 'string') {
      window.open(file, '_blank');
    } else if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }
  };
  
  return (
    <CListGroup flush>

      {
        console.log(studentId, 'Student')
      }
      {filesArray.map((docType) => (
        <CListGroupItem key={docType}>
          <strong>{docType.toUpperCase()}:</strong>
          <CRow className="mt-2 align-items-center">
            <CCol md={8} className="d-flex align-items-center">
              {documents[docType] && typeof documents[docType] === 'string' ? (
                <CButton
                  color="info"
                  size="sm"
                  onClick={() => handleViewDocument(documents[docType])}
                  className='btn3'
                >
                  View Document
                </CButton>
              ) : (
                <>
                  <CFormInput
                    type="file"
                    onChange={(e) => handleFileChange(docType, e)}
                    disabled={uploading[docType]}
                    style={{ flex: 1 }}
                  />
                  <CButton
                    color="primary"
                    onClick={() => handleUpload(docType)}
                    disabled={uploading[docType]}
                    className="btn2"
                  >
                    {uploading[docType] ? <CSpinner size="sm" /> : 'Upload'}
                  </CButton>
                </>
              )}
            </CCol>
          </CRow>
        </CListGroupItem>
      ))}
    </CListGroup>
  )
}

export default DocumentsUploadsForm