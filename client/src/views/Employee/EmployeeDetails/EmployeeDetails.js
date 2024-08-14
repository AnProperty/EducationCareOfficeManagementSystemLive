import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './EmployeeDetails.css';
import DownloadButtonEmployee from '../../../components/ZipDownLoaderButton/DownloadButtonEmployee';
import EmployeeModal from './EmployeeModal'; // Import the modal component
import axios from 'axios';
import Swal from 'sweetalert2';
import CIcon from '@coreui/icons-react'
import {
    cilDelete
} from '@coreui/icons'


const EmployeeDetails = () => {
    const { state } = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)


    const [roleList, setRoleList] = useState([])

    const [Designation, setDesignation] = useState([
        'Select Role',
        'receptionist',
        'admin Officer',
        'Software Engineer',
        'Hr',
        'Counselor',
        'Admin Office Visa Section',
    ]);

    useEffect(() => {
        // Fetch user role
        fetch(`${process.env.REACT_APP_API_BASE_URL}/role/${state.item.email}`)
            .then((res) => res.json())
            .then((data) => {
                setRoleList(data.data)
                const updatedDesignation = Designation.filter(
                    (role) => !data.data.some((item) => item.role === role)
                );
                setDesignation(updatedDesignation);
            })
            .catch((error) => console.error('Error fetching role:', error));
    }, [state]);








    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const navigate = useNavigate()

    const CreateNewRoleEmployee = async (Data) => {


        // console.log(Data);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/super-admin/add-new-role`,
                Data,
            )
            // console.log(res.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Employee Created Successfully',
                showConfirmButton: false,
                timer: 1500,
            })
            navigate('/super-admin/employee/employee-list')
            setIsSubmitted(true)
        } catch (error) {
            setIsSubmitted(false)
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: `${error}`,
                showConfirmButton: false,
                timer: 1500,
            })
        } finally {
            setLoading(false)
        }
    }
    const removeRole = async (_id) => {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/role/${_id}`);
    }
    const handleRemoveRole = async (_id) => {

        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                removeRole(_id)
                Swal.fire(
                    'Removed!',
                    'Your role has been removed.',
                    'success'
                )
            }
        })
    }

    const updateEmployee = (role) => {
        // state.item.employee_id = employeeId;
        // state.item.password = password;
        state.item.role = role;
        state.item.students = [];





        delete state.item._id



        CreateNewRoleEmployee(state.item)

    };

    return (
        <div>
            {
                console.log(state)
            }

            <div className="about-wrapper">
                <div className="about-left">
                    <div className="about-left-content">
                        <div>
                            <div className="shadow">
                                <div className="about-img">
                                    <img src={state.item.profilePic} alt="about image" />
                                </div>
                            </div>

                            <h2 className='text-center'>{state.item.name}</h2>
                            {
                                roleList.map((item) => {
                                    return (
                                        <div key={item._id} className='d-flex align-items-center justify-content-between my-2' onClick={() => handleRemoveRole(item._id)}>
                                            <h5>{item.role}</h5> <button className='btn1'><CIcon icon={cilDelete} /></button>

                                        </div>

                                    )
                                })
                            }

                        </div>

                        <ul className="icons">
                            <li><i className="fab fa-facebook-f"></i></li>
                            <li><i className="fab fa-twitter"></i></li>
                            <li><i className="fab fa-linkedin"></i></li>
                            <li><i className="fab fa-instagram"></i></li>
                        </ul>
                    </div>

                </div>

                <div className="about-right">
                    <h3>Global Education Care<span>!</span></h3>
                    <div className="about-btns">
                        <Link to={state.item.cv} target='_blank'><button type="button" className="btn btn-pink">resume / CV</button></Link>
                        <button type="button" disabled={isSubmitted} className="btn btn-white" onClick={openModal}> {loading ? 'Adding.....' : 'Add Role'}</button>
                        {loading && (
                            <div className="preloader">
                                <h3>Loading</h3>
                            </div>
                        )}
                    </div>

                    <div className="about-para">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus iure tempora alias laudantium sapiente impedit!</p>
                    </div>
                    <div className="credit">Made with <span style={{ color: "tomato" }}>❤</span> by <a href="https://www.learningrobo.com/">Learning Robo</a></div>
                </div>
                {
                    console.log(state.item.employee_id)
                }

            </div>

            <div>
                <DownloadButtonEmployee employee_id={state.item.employee_id} ></DownloadButtonEmployee>
            </div>

            {/* Render the modal and pass the necessary props */}
            {showModal && <EmployeeModal showModal={showModal} closeModal={closeModal} updateEmployee={updateEmployee} Designation={Designation} />}
        </div>
    );
};

export default EmployeeDetails;
