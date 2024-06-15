import React from 'react';
import axios from 'axios';

const DownloadButtonStudent = ({ studentId }) => {
  console.log(studentId)
  const handleDownloadStudentDocs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/utilities/download-docs/${studentId}`, {
        responseType: 'blob',
      });
      console.log(response.data)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `documents_of_student - ${studentId}.zip`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the zip file', error);
    }
  };

  return (
    <div className='d-flex'>
      <button onClick={handleDownloadStudentDocs} className='btn btn3 ms-auto'>Download all</button>
    </div>
  );
};

export default DownloadButtonStudent;
