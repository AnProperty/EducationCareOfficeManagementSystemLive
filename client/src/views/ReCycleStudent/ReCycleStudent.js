import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReCycleStudent = () => {
    const [archivedStudents, setArchivedStudents] = useState([]);

    // Fetch archived students on component mount
    useEffect(() => {
        fetchArchivedStudents();
    }, []);

    // Function to fetch archived students from the backend
    const fetchArchivedStudents = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/utilities/archived-students`);
            setArchivedStudents(response.data);
        } catch (error) {
            console.error('Error fetching archived students:', error);
        }
    };

    // Function to restore a student back to the Employee collection
    const handleRestore = async (studentId, employeeId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/utilities/restore-student`, {
                studentId,
                employeeId,
            });
            // Remove restored student from the list
            setArchivedStudents(archivedStudents.filter((student) => student?.student?._id !== studentId));
            alert('Student restored successfully.');
        } catch (error) {
            console.error('Error restoring student:', error);
        }
    };

    return (
        <div>
            <h1>Archived Student List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Removed From Employee</th>
                        <th>Restore</th>
                    </tr>
                </thead>
                <tbody>
                    {archivedStudents.map((archivedStudent, index) => (
                        <tr key={archivedStudent?._id}>
                            <td>{index + 1}</td>
                            <td>{archivedStudent?.student?.fullName}</td>
                            <td>{archivedStudent?.removedFromEmployee?.name}</td>
                            <td>
                                <button
                                    className="btn3 btn-primary"
                                    onClick={() =>
                                        handleRestore(archivedStudent.student._id, archivedStudent.removedFromEmployee._id)
                                    }
                                >
                                    Restore
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReCycleStudent;
