import axios from 'axios';
import React, { useState } from 'react';

const DownloadFromSuperAdmin = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('follow-up')

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    const handleDownload = async () => {
        try {
            const query = new URLSearchParams();
            if (startDate) query.append('startDate', startDate);
            if (endDate) query.append('endDate', endDate);

            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/utilities/download-leads/${status}?${query.toString()}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.xlsx'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };


    return (
        <div className='d-flex my-4 justify-content-evenly forDownloadLabel'>
            <div className="d-flex align-items-center">
                <label>Status</label>
                <select id="status" name='status' onChange={handleStatus} >
                    <option value="follow-up">FollowUp</option>
                    <option value="success">success</option>
                    
                </select>
            </div>
            <div className='d-flex align-items-center'>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className='d-flex align-items-center'>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className='align-items-center'><button className='btn btn4' onClick={handleDownload}>DownLoad Leads</button></div>
        </div>
    );
};
export default DownloadFromSuperAdmin;