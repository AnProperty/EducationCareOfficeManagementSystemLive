import axios from 'axios';
import React, { useState } from 'react';

const DownloadFromSuperAdmin = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('follow-up');

    const handleStatus = (e) => {
        setStatus(e.target.value);
    };

    const getNextDayDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1); // Set date to the next day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDownload = async () => {
        try {
            const query = new URLSearchParams();
            if (startDate) query.append('startDate', startDate);

            // Set endDate to next day date if not provided
            const finalEndDate = endDate || getNextDayDate();
            query.append('endDate', finalEndDate);

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
                    <option value="follow-up">Follow-Up</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="success">Success</option>
                    <option value="visa-processing">visa-processing</option>
                    <option value="rejected">Rejected</option>

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
            <div className='align-items-center'>
                <button className='btn btn4' onClick={handleDownload}>Download Leads</button>
            </div>
        </div>
    );
};

export default DownloadFromSuperAdmin;
