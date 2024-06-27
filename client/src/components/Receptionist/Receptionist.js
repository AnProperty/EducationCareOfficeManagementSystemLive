/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TodaysStudents from '../../views/Students/TodaysStudents/TodaysStudents'

const Dashboard = () => {
    const lol = new Date()
    const date = lol.toISOString().split('T')[0]
    const [filteringDate, setFilteringDate] = useState(date)


    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-student-list`)
            .then((res) => res.json())
            .then((data) => setStudents(data.data))
    }, [])


    const filterStudentsCreatedToday = (students) => {
        // const todayISO = getTodayDateISO();
        // console.log("todayISO",todayISO);
        return students.filter((student) => student.createdAt.startsWith(filteringDate))
    }
    const studentsCreatedToday = filterStudentsCreatedToday(students)
    console.log('studentsCreatedToday', studentsCreatedToday)
    //Todays Students

    const getPreviousDate = async (todaysDate) => {
        const date = new Date(todaysDate)
        date.setDate(date.getDate() - 1)
        return date.toISOString().split('T')[0]
    }
    const getNextDate = async (todaysDate) => {
        const date = new Date(todaysDate)
        date.setDate(date.getDate() + 1)
        return date.toISOString().split('T')[0]
    }

    const OneDayAgo = async () => {
        const previousDate = await getPreviousDate(filteringDate)
        setFilteringDate(previousDate)
        console.log(previousDate)
    }
    const OneDayNext = async () => {
        const previousDate = await getNextDate(filteringDate)
        setFilteringDate(previousDate)
        console.log(previousDate)
    }

    const handleSpecificDateDownload = async () => {
        const body = studentsCreatedToday;
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/utilities/download-specific-date`, body, {
            responseType: 'blob',
        })
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx'); // Specify the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <section className="container">


            <br></br>

            <section>
                <h3 className="text-center mb-5"> Students Arrived on {filteringDate} </h3>
                <TodaysStudents students={studentsCreatedToday} />
            </section>
            <section className="d-flex align-content-between justify-content-center my-4">
                <button className="btn btn3" onClick={OneDayAgo}>
                    Pre
                </button>
                <button className="btn btn4" onClick={handleSpecificDateDownload}>
                    Download
                </button>
                <button
                    className="btn2 btn"
                    onClick={OneDayNext}
                    disabled={date === filteringDate ? true : false}
                >
                    Next
                </button>
            </section>

        </section>
    )
}

export default Dashboard
