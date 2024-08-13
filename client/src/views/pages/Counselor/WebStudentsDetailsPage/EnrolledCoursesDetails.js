import React from 'react';

const EnrolledCoursesDetails = ({ counselorStudentCourses }) => {
    return (
        <div>
            <div className="container mt-4">
                <h4 className="text-center">Students Application List</h4>
                <section className='d-flex flex-wrap justify-content-between'>
                    {counselorStudentCourses.map((course, index) => {
                        const {
                            subject,
                            university,
                            level,
                            destination,
                            ieltsScore,
                            location,
                            campusCity,
                            tuitionFees,
                            applicationFees,
                            duration,
                            intake,
                            worldRank,
                            internationalStudent,
                            courseDetailLink,
                            universityDetailLink
                        } = course.courseId;
                        const { status, createdAt, note, offerLetter } = course;

                        return (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{subject}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{university}</h6>
                                    <p className="card-text">
                                        <strong>Level:</strong> {level}<br />
                                        <strong>Destination:</strong> {destination}<br />
                                        <strong>IELTS Score:</strong> {ieltsScore}<br />
                                        <strong>Location:</strong> {location}<br />
                                        <strong>Campus City:</strong> {campusCity}<br />
                                        <strong>Tuition Fees:</strong> {tuitionFees}<br />
                                        <strong>Application Fees:</strong> {applicationFees}<br />
                                        <strong>Duration:</strong> {duration}<br />
                                        <strong>Intake:</strong> {intake}<br />
                                        <strong>World Rank:</strong> {worldRank}<br />
                                        <strong>International Students:</strong> {internationalStudent}<br />
                                    </p>
                                    <a href={courseDetailLink} className="card-link">Course Details</a>
                                    <a href={universityDetailLink} className="card-link">University Details</a>
                                    {offerLetter && <a href={offerLetter} className="card-link">Offer Letter</a>}
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">
                                        Status: {status} | Created At: {new Date(createdAt).toLocaleDateString()}
                                        {note && <><br /><strong>Note:</strong> {note}</>}
                                    </small>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </div>
    );
};

export default EnrolledCoursesDetails;