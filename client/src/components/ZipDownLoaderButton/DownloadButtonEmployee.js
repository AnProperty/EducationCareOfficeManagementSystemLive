import React from 'react';
import axios from 'axios';

const DownloadButtonEmployee = ({ employee_id }) => {
  const handleDownloadEmployeeDocs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/super-admin/download-employee-docs/${employee_id}`, {
        responseType: 'blob',
      });
      console.log(response.data)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `documents_of_${employee_id}.zip`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the zip file', error);
    }
  };

  return (
    <button onClick={handleDownloadEmployeeDocs} className="btn btn3">Download</button>
  );
};

export default DownloadButtonEmployee;
