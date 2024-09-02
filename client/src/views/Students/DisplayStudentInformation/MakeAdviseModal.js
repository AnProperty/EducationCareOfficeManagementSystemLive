import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyModal = ({ show, handleClose, studentId, counselorId, setAd }) => {
    const [advicesList, setAdvicesList] = useState({
        advices: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value);

        setAdvicesList(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleAdvices = (e) => {
        e.preventDefault()

        axios
            .patch(
                `${process.env.REACT_APP_API_BASE_URL}/counselor/make-advices/${studentId}/${counselorId}`,
                advicesList,
            )
            .then((response) => {
                console.log(response.data.data)
                setAd(response.data.data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Advices Created Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                })
            })
            .catch((error) => console.error(error))
    }

    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1"
            role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Advice to Students</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close">

                        </button>
                    </div>
                    <div className="modal-body">
                        <label className="form-label">Provide Your Listed Advices</label>
                        <textarea className="form-control" value={advicesList.advices} name="advices" id="advices" rows="10" onChange={handleChange}></textarea>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn5" onClick={handleClose}>Close</button>
                        <button type="button" className="btn btn4" onClick={(e) => handleAdvices(e)}> Save </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyModal;