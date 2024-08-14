import React, { useEffect, useState } from 'react';

const EmployeeModal = ({ showModal, closeModal, updateEmployee, Designation }) => {



    // const [employeeId, setEmployeeId] = useState('');
    // const [password, setPassword] = useState('');
    const [role, setRole] = useState('');






    const handleSubmit = () => {
        updateEmployee(role);
        closeModal();
    };


    return (
        <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Employee Details</h5>
                        <button type="button" className="close" onClick={closeModal}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* <div className="form-group">
                            <label>Employee ID</label>
                            <input
                                type="text"
                                className="form-control"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div> */}
                        <div className="form-group">
                            <label>Assign New Role</label>
                            <select
                                className="form-control"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {Designation.map((c, index) => {
                                    return (
                                        <option key={index} value={c}>
                                            {c}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn2" onClick={closeModal}>Close</button>
                        <button type="button" className="btn3" onClick={handleSubmit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeModal;