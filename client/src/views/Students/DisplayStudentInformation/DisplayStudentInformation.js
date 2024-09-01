/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import EnrolledCoursesDetails from '../../pages/Counselor/WebStudentsDetailsPage/EnrolledCoursesDetails';
import PreviousButton from '../../../utilities/PreviousPage';
// import StatusProgress from './StatusProgress';

const DisplayStudentInformation = () => {
    let { state } = useLocation()
    const { studentId, counselorId } = useParams()
    console.log(studentId, counselorId);
    const [show, setShow] = useState(false);
    const [counselorStudentCourses, setCounselorStudentCourses] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function isValidObjectId(id) {
        // Regular expression to check if a string is a 24-character hex string
        return /^[a-fA-F0-9]{24}$/.test(id);
      }
    const urlToCopy = `https://antgec.com/file-upload/${studentId}/${counselorId}`;
    const copyToClipboard = () => {

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(urlToCopy)
                .then(() => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Link copied to clipboard!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch((err) => {
                    console.error('Failed to copy the link: ', err);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Failed to copy the link",
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
        } else {
            console.error('Clipboard API not available');
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Clipboard API not available",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const [studentDocuments, setStudentDocuments] = useState([])
    useEffect(() => {
        const getStudentDetails = async () => {
            fetch(`https://api.antgec.com/student/${studentId}/${counselorId}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('okkkkkkkkkk', data)
                    const obj = data.data
                    console.log(obj)
                    setStudentDocuments(obj)
                })
        }
        getStudentDetails();
        const fetchData = async () => {
            try {
                fetch(`https://api.gecare.co.uk/user/application-list/${studentId}`)
                    .then((res) => res.json())
                    .then((data) => console.log(data))
            } catch (err) {
                console.error("Error fetching profile info:", err);
            }
        }
        isValidObjectId(studentId) && fetchData();
        
    }, [])
    const user = JSON.parse(localStorage.getItem("user"))








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
                    `https://api.antgec.com/counselor/make-advices/${studentId}/${counselorId}`,
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
    const [ad, setAd] = useState(state?.item?.advices)
    const advicesArray = ad?.split(/\s*(\d+\.\s+)/).filter((str, index) => str && (index % 2 === 0));

    return (
        <div className='container my-3'>
            {/* <StatusProgress currentStatus={state?.item?.status} /> */}

            <section className='d-flex my-5 justify-content-between'>

                <section>
                    <section className="d-flex justify-content-between">
                        <p>
                            <b>Entry Date : </b>
                            {state?.item.createdAt}
                            {/* {state?.item.entryDate} */}
                        </p>
                    </section>
                    <section>

                        <p>
                            <b>Name : </b> {state.item.fullName}
                        </p>
                        <p>
                            <b>Address : </b>
                            {state.item.street},{state.item.country}
                        </p>
                        <p>
                            <b>Contact number : </b>
                            {state.item.phoneNumber}
                        </p>
                    </section>
                </section>
                <section className="d-flex">
                    <img style={{ width: '150px', height: '100px', marginRight: 50 }} src={logo} alt="Logo" />

                </section>
            </section>
            <section>
                <h4>
                    <i>Educational Details</i>
                </h4>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Course Title</th>
                            <th scope="col">Passing Year</th>
                            <th scope="col">Grade/CGPA</th>
                            <th scope="col">Subject/Group</th>
                            <th scope="col">Institute Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">SSC</th>
                            <td>{state.item.passingYear1}</td>
                            <td>{state.item.grade1}</td>
                            <td>{state.item.group1}</td>
                            <td>{state.item.institute1}</td>
                        </tr>
                        <tr>
                            <th scope="row">HSC</th>
                            <td>{state.item.passingYear2}</td>
                            <td>{state.item.grade2}</td>
                            <td>{state.item.group2}</td>
                            <td>{state.item.institute2}</td>
                        </tr>
                        <tr>
                            <th scope="row">Hon's </th>
                            <td>{state.item.passingYear3}</td>
                            <td>{state.item.grade3}</td>
                            <td>{state.item.group3}</td>
                            <td>{state.item.institute3}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <h4>
                    IELT'S
                </h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Reading</th>
                            <th scope="col">Writing</th>
                            <th scope="col">Listening</th>
                            <th scope="col">Speaking</th>
                            <th scope="col">Overall</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{state.item.reading}</td>
                            <td>{state.item.writing}</td>
                            <td>{state.item.listening}</td>
                            <td>{state.item.specking}</td>
                            <td>{state.item.overall}</td>
                        </tr>
                    </tbody>
                </table>
                <div>

                </div>

                <section>
                    {counselorStudentCourses && <EnrolledCoursesDetails counselorStudentCourses={counselorStudentCourses} />}
                </section>


                <div>
                    <div className='d-flex justify-content-around border border-dark mb-3'>
                        <p>
                            <strong>Counselor Name : {state.item.counselor.employee_name}</strong>
                        </p>
                        <p>{
                            ad ?
                                <ul>
                                    <strong>Counselor Advices : </strong>
                                    {advicesArray?.map((advice, index) => (
                                        <p className='ms-5' key={index}>{index + 1}. {advice.trim()}</p>
                                    ))}
                                </ul>
                                : <h5>No Advices</h5>

                        }
                        </p>
                    </div>

                    <MyModal show={show} handleClose={handleClose} studentId={studentId} counselorId={counselorId} setAd={setAd} />
                </div>
            </section>


            <section className="d-flex justify-content-between">
                <PreviousButton />
                <button onClick={copyToClipboard} className='btn btn3'>Copy Link</button>
                <Link to={urlToCopy} target='_blank'><button className='btn btn2'>Attestation</button></Link>
                {user.role === "Counselor" && !state.item.advise &&
                    <div>
                        <button className='btn btn4' onClick={handleShow}>Make Advices</button>
                    </div>
                }
                {studentDocuments.length ? (
                    <>
                        {user.role === "Super Admin" && (
                            <Link to={`/super-admin/student-documents/${studentId}/${counselorId}`} state={{
                                sudentsDocuments:
                                    studentDocuments[0], stdId: state.item._id, app: state.item.applicant
                            }}>
                                <button className='btn btn5'>Next &gt;&gt;</button>

                            </Link>
                        )}
                        {user.role === "Counselor" && (
                            <Link to={`/counselor/student-documents/${studentId}/${counselorId}`} state={{
                                sudentsDocuments:
                                    studentDocuments[0], stdId: state.item._id, app: state.item.applicant
                            }}>
                                <button className='btn btn5'>Next &gt;&gt;</button>
                            </Link>
                        )}
                        {user.role === "admin Officer" && (
                            <Link to={`/admin-officer/student-documents/${studentId}/${counselorId}`} state={{
                                sudentsDocuments:
                                    studentDocuments[0], stdId: state.item._id, app: state.item.applicant
                            }}>

                                <button className='btn btn5'>Next &gt;&gt;</button>
                            </Link>
                        )}
                        {user.role === "Admin Office Visa Section" && (
                            <Link to={`/visa-process/student-documents/${studentId}/${counselorId}`} state={{
                                sudentsDocuments:
                                    studentDocuments[0], stdId: state.item._id, app: state.item.applicant
                            }}>

                                <button className='btn btn5'>Next &gt;&gt;</button>
                            </Link>
                        )}
                    </>
                ) : (
                    <h3 className='text-danger'>No Documents Submitted</h3>
                )}
            </section>


        </div>
    )
}

export default DisplayStudentInformation
