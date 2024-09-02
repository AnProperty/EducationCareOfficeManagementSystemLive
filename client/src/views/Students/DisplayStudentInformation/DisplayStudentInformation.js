/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const EnrolledCoursesDetails = React.lazy(() => import('../../pages/Counselor/WebStudentsDetailsPage/EnrolledCoursesDetails'));
const PreviousButton = React.lazy(() => import('../../../utilities/PreviousPage'));
const StatusProgress = React.lazy(() => import('./StatusProgress'));
const MyModal = React.lazy(() => import('./MakeAdviseModal'));

const DisplayStudentInformation = () => {
    let { item } = useLocation().state
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
            fetch(`${process.env.REACT_APP_API_BASE_URL}/student/${studentId}/${counselorId}`)
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




    const [ad, setAd] = useState(item?.advices)
    const advicesArray = ad?.split(/\s*(\d+\.\s+)/).filter((str, index) => str && (index % 2 === 0));

    return (
        <div className='container my-3'>
            <StatusProgress currentStatus={item?.status} />

            <section className='d-flex my-5 justify-content-between'>

                <section>
                    <section className="d-flex justify-content-between">
                        <p>
                            <b>Entry Date : </b>
                            {item.createdAt}
                            {/* { item.entryDate} */}
                        </p>
                    </section>
                    <section>

                        <p>
                            <b>Name : </b> {item.fullName}
                        </p>
                        <p>
                            <b>Address : </b>
                            {item.street},{item.country}
                        </p>
                        <p>
                            <b>Contact number : </b>
                            {item.phoneNumber}
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
                            <td>{item.passingYear1}</td>
                            <td>{item.grade1}</td>
                            <td>{item.group1}</td>
                            <td>{item.institute1}</td>
                        </tr>
                        <tr>
                            <th scope="row">HSC</th>
                            <td>{item.passingYear2}</td>
                            <td>{item.grade2}</td>
                            <td>{item.group2}</td>
                            <td>{item.institute2}</td>
                        </tr>
                        <tr>
                            <th scope="row">Hon's </th>
                            <td>{item.passingYear3}</td>
                            <td>{item.grade3}</td>
                            <td>{item.group3}</td>
                            <td>{item.institute3}</td>
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
                            <td>{item.reading}</td>
                            <td>{item.writing}</td>
                            <td>{item.listening}</td>
                            <td>{item.specking}</td>
                            <td>{item.overall}</td>
                        </tr>
                    </tbody>
                </table>


                <section>
                    {counselorStudentCourses && <EnrolledCoursesDetails counselorStudentCourses={counselorStudentCourses} />}
                </section>


                <div>
                    <div className='d-flex justify-content-around border border-dark mb-3'>
                        <p>
                            <strong>Counselor Name : {item.counselor.employee_name}</strong>
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
                {user.role === "Counselor" && !item.advise &&
                    <div>
                        <button className='btn btn4' onClick={handleShow}>Make Advices</button>
                    </div>
                }
                {studentDocuments.length ? (
                    <>
                        {user.role === "Super Admin" && (
                            <Link to={`/super-admin/student-documents/${studentId}/${counselorId}`} state={{
                                sudentsDocuments:
                                    studentDocuments[0], stdId: item._id, app: item.applicant
                            }}>
                                <button className='btn btn5'>Next &gt;&gt;</button>

                            </Link>
                        )}
                        {user.role === "Counselor" && (
                            <Link to={`/counselor/student-documents/${studentId}/${counselorId}`} state={{
                                sudentsDocuments:
                                    studentDocuments[0], stdId: item._id, app: item.applicant
                            }}>
                                <button className='btn btn5'>Next &gt;&gt;</button>
                            </Link>
                        )}
                        {user.role === "admin Officer" && (
                            <Link to={`/admin-officer/student-documents/${studentId}/${counselorId}`} state={{
                                sudentsDocuments:
                                    studentDocuments[0], stdId: item._id, app: item.applicant
                            }}>

                                <button className='btn btn5'>Next &gt;&gt;</button>
                            </Link>
                        )}
                        {user.role === "Admin Office Visa Section" && (
                            <Link to={`/visa-process/student-documents/${studentId}/${counselorId}`} state={{
                                sudentsDocuments:
                                    studentDocuments[0], stdId: item._id, app: item.applicant
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
