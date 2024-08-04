import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EnrolledCoursesDetails from './EnrolledCoursesDetails';
import Swal from 'sweetalert2';


const WebStudentsDetailsPage = () => {
    let { state } = useLocation()
    const { item } = state;
    const [activeTab, setActiveTab] = useState(0);
    const [counselorList, setCounselorList] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [counselorStudentCourses, setCounselorStudentCourses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                fetch(`https://api.gecare.co.uk/user/application-list/${item?.userId}`)
                    .then((res) => res.json())
                    .then((data) => setCounselorStudentCourses(data.data))
            } catch (err) {
                console.error("Error fetching profile info:", err);
            }
        }
        fetchData();
        const FetchEmployees = async () => {
            fetch(`https://api.antgec.com/api/v1/super-admin/get-employee-list`)
                .then((res) => res.json())
                .then((data) => {

                    let counselorList = data.data.filter((item) => item.role === 'Counselor')
                    setCounselorList(counselorList);
                });
        }
        FetchEmployees();
    }, [])
    const handleTabClick = (index) => {
        setActiveTab(index);
    };


    // Creating Students start
    const [formData, setFormData] = useState({
        studentId: item?.userId ? item?.userId : '',
        fullName: item?.general?.name ? item?.general?.name : '',
        email: item?.general?.email ? item?.general?.email : '',
        phoneNumber: item?.general?.phone ? item?.general?.phone : '',
        parentPhone: '',
        dob: '',
        street: '',
        city: '',
        postalCode: '',
        country: 'Bangladesh',
        courseTitle1: '',
        passingYear1: '',
        grade1: '',
        group1: '',
        institute1: '',
        courseTitle2: '',
        passingYear2: '',
        grade2: '',
        group2: '',
        institute2: '',
        courseTitle3: '',
        passingYear3: '',
        grade3: '',
        group3: '',
        institute3: '',
        courseTitle4: item?.education?.qualification ? item?.education?.qualification : '',
        passingYear4: '',
        grade4: item?.education?.qualificationScore ? item?.education?.qualificationScore : '',
        group4: '',
        institute4: '',
        howKnow: '',
        englishProficiency: item?.education?.englishTest ? item?.education?.englishTest : '',
        reading: '',
        writing: '',
        listening: '',
        specking: '',
        overall: item?.education?.total,
        testDate: '',
        probableDate: '',
        chosenCountryName: '',
        anyCountryRefusal: '',
        universityChoice: '',
        intake: '',
        course: '',
        bankStatement: '',
        bankName: '',
        beforeAppliedAgent: '',
        beforeAppliedUniversity: '',
        counselor: {
            employee_id: '',
            id: '',
        },
        applicant: [
            {
                id: '',
                applicantId: '',
                applicant_name: '',
            },
        ],
    })

    const handleCounselor = (e) => {
        e.preventDefault()
        const selectedValue = e.target.value
        const parsedValue = JSON.parse(selectedValue)
        // setCounselor(parsedValue.employeeId)

        setFormData((prevData) => ({
            ...prevData,
            counselor: {
                employee_id: parsedValue.employeeId,
                employee_name: parsedValue.employee_name,
                id: parsedValue.id,
            },
            status: 'follow-up',
        }))
        console.log(parsedValue);
    }


    const handleConnection = async () => {

        setLoading(true);
        try {

            const res = await fetch(
                `https://api.antgec.com/api/v1/receptionist/student/${item.general.name}/${item.general.phone}`
            );
            const data = await res.json();
            if (data.data.length > 0) {
                setLoading(false);
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Student already exists',
                    showConfirmButton: false,
                    timer: 1500,
                })
                return;
            } else {
                const response = await fetch(`https://api.antgec.com/api/v1/receptionist/add-student`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Student Created Successfully',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                } else {
                    console.error("Failed to create student:", response.statusText);
                }
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
        setIsSubmitted(true);
    };




    //creating students end














    return (

        <>

            <div className="container mt-4">
                {console.log(item)}
                <h1 className="text-center mb-4">Student Profile</h1>
                <div className="d-flex justify-content-center mb-4">
                    {["General Information", "Educational Info", "Additional Information"].map(
                        (tab, index) => (
                            <button
                                key={index}
                                onClick={() => handleTabClick(index)}
                                className={`btn btn-primary text-info mx-2 ${activeTab === index ? "bg-primary" : "btn btn-outline-success"}`}
                            >
                                {tab}
                            </button>
                        )
                    )}
                </div>
                <form className="bg-light p-4 rounded shadow-sm">
                    {activeTab === 0 && (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2>General Information</h2>
                                {/* <button type="button" onClick={() => toggleEdit(0)} className="btn btn-link text-primary p-0">
                                    <FaEdit />
                                </button> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input readOnly
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={item?.general?.name}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input readOnly
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={item?.general?.email}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="phone">Phone</label>
                                <input readOnly
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    value={item?.general?.phone}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    )}
                    {activeTab === 1 && (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2>Educational Information</h2>
                                {/* <button type="button" onClick={() => toggleEdit(1)} className="btn btn-link text-primary p-0">
                                    <FaEdit />
                                </button> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="chosenCountries">Countries you want to go</label>
                                <input readOnly
                                    id="countryinput readOnly"
                                    name="countryinput readOnly"
                                    type="text"
                                    className="form-control"
                                    placeholder="Start typing to see suggestions..."
                                />
                                <div className="d-flex flex-wrap mt-2">
                                    {console.log(state)}
                                    {item.education.chosenCountries
                                        .map((country, index) => (
                                            <div key={index} className="badge bg-primary m-1">
                                                {country}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="englishTest">English Proficiency Test</label>
                                <select
                                    id="englishTest"
                                    name="englishTest"
                                    value={item?.education?.englishTest}
                                    readOnly
                                    className="form-select"
                                >

                                </select>
                            </div>
                            {["reading", "writing", "listening", "speaking", "total"].map((field, index) => (
                                <div className="mb-3" key={index}>
                                    <label className="form-label" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)} Score</label>
                                    <input readOnly
                                        id={field}
                                        name={field}
                                        type="number"
                                        value={item?.education[field]}

                                        className="form-control"
                                    />
                                </div>
                            ))}
                            <div className="mb-3">
                                <label className="form-label" htmlFor="qualification">Last Academic Qualification</label>
                                <select
                                    id="qualification"
                                    name="qualification"
                                    value={item?.education?.qualification}
                                    readOnly
                                    className="form-select"
                                >

                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="qualificationScore">Last Academic Qualification Score</label>
                                <input readOnly
                                    id="qualificationScore"
                                    name="qualificationScore"
                                    type="number"
                                    value={item?.education?.qualificationScore}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    )}
                    {activeTab === 2 && (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2>Additional Information</h2>
                                {/* <button type="button" onClick={() => toggleEdit(2)} className="btn btn-link text-primary p-0">
                                    <FaEdit />
                                </button> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="address">Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={item?.additional?.address}
                                    className="form-control"
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="withSpouse">With Spouse?</label>
                                <select
                                    id="withSpouse"
                                    name="withSpouse"
                                    value={item?.additional?.withSpouse}
                                    readOnly
                                    className="form-select"
                                >

                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="withChildren">With Children?</label>
                                <select
                                    id="withChildren"
                                    name="withChildren"
                                    value={item?.additional?.withChildren}
                                    readOnly
                                    className="form-select"
                                >

                                </select>
                            </div>
                        </div>
                    )}
                </form>

            </div>
            <section>
                <EnrolledCoursesDetails counselorStudentCourses={counselorStudentCourses} />
            </section>
            <section>
                <div className="my-12">
                    <div className="inline-block relative w-full flex items-center justify-center">
                        <label htmlFor="counselor" className='mr-6'>Counselor Name : </label>
                        <select className='border border-gray-400 mr-6' id="counselor" name="counselor" onChange={handleCounselor} required>
                            <option>Choose One Counselor</option>
                            {counselorList.map((item) => (
                                <option
                                    key={item.employee_id}
                                    value={JSON.stringify({
                                        id: item._id,
                                        employeeId: item.employee_id,
                                        employee_name: item.name,
                                    })}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleConnection} type="button" className="bg-success btn btn-primary w-100" disabled={isSubmitted}>
                            {loading ? 'Assigning.....' : 'Assign'}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WebStudentsDetailsPage;