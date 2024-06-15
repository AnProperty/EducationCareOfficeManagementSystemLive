import React from 'react';
import axios from 'axios';

const DownloadButtonUniDOcs = ({ studentId,applicantId }) => {
  console.log(studentId,applicantId)
  const handleDownloadUniDocs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/utilities/download-docs/${applicantId}/${studentId}`, {
        responseType: 'blob',
      });
      console.log(response.data)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `University documents of student - ${studentId}.zip`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the zip file', error);
    }
  };

  return (
    <button onClick={handleDownloadUniDocs} className="btn btn4">Download all</button>
  );
};

export default DownloadButtonUniDOcs;
