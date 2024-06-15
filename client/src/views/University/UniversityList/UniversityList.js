import React, { useState, useEffect, useCallback } from 'react';
import fakeData from '../../../assets/Fakedata/universityData.json';
import ReactPaginate from 'react-paginate';
import './UniversityList.css';

const UniversityList = () => {
    const [data, setData] = useState(fakeData);
    const [filteredData, setFilteredData] = useState([]);
    const [country, setCountry] = useState('');
    const [course, setCourse] = useState('');
    const [intake, setIntake] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [countrySuggestions, setCountrySuggestions] = useState([]);
    const [courseSuggestions, setCourseSuggestions] = useState([]);
    const [intakeSuggestions, setIntakeSuggestions] = useState([]);

    // Filter data based on filter criteria
    const filterData = useCallback(() => {
        let filtered = [...data];

        if (country) {
            filtered = filtered.filter(uni => uni.country.toLowerCase().includes(country.toLowerCase()));
        }

        if (course) {
            filtered = filtered.filter(uni => uni.courses.some(c => c.toLowerCase().includes(course.toLowerCase())));
        }

        if (intake) {
            filtered = filtered.filter(uni => uni.intakes.some(i => i.toLowerCase().includes(intake.toLowerCase())));
        }

        setFilteredData(filtered);
    }, [country, course, intake, data]);

    const updateSuggestions = (inputValue, setSuggestions, field) => {
        let suggestions = [];
        if (inputValue) {
            const lowercasedInputValue = inputValue.toLowerCase();
            const uniqueValues = new Set();

            data.forEach(uni => {
                let values;
                if (field === 'country') {
                    values = [uni.country];
                } else if (field === 'course') {
                    values = uni.courses;
                } else if (field === 'intake') {
                    values = uni.intakes;
                }

                values.forEach(value => {
                    if (value.toLowerCase().startsWith(lowercasedInputValue)) {
                        uniqueValues.add(value);
                    }
                });
            });

            suggestions = Array.from(uniqueValues);
        }
        setSuggestions(suggestions);
    };

    useEffect(() => {
        filterData();
    }, [country, course, intake, filterData]);

    const [pageNumber, setPageNumber] = useState(0);
    const papersPerPage = 10;
    const paperVisited = pageNumber * papersPerPage;
    const paginatePaper = filteredData.slice(paperVisited, paperVisited + papersPerPage);
    const pageCount = Math.ceil(filteredData.length / papersPerPage);
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className='container'>
            <h1 className='text-center'>Filter Universities</h1>
            <section className='FilterUniversity d-flex justify-content-around'>
                <div>
                    <label>Country:</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            updateSuggestions(e.target.value, setCountrySuggestions, 'country');
                        }}
                    />
                    {countrySuggestions.length > 0 && (
                        <ul>
                            {countrySuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => {
                                    setCountry(suggestion);
                                    setCountrySuggestions([]);
                                }}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <label>Course:</label>
                    <input
                        type="text"
                        value={course}
                        onChange={(e) => {
                            setCourse(e.target.value);
                            updateSuggestions(e.target.value, setCourseSuggestions, 'course');
                        }}
                    />
                    {courseSuggestions.length > 0 && (
                        <ul>
                            {courseSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => {
                                    setCourse(suggestion);
                                    setCourseSuggestions([]);
                                }}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <label>Intake:</label>
                    <input
                        type="text"
                        value={intake}
                        onChange={(e) => {
                            setIntake(e.target.value);
                            updateSuggestions(e.target.value, setIntakeSuggestions, 'intake');
                        }}
                    />
                    {intakeSuggestions.length > 0 && (
                        <ul>
                            {intakeSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => {
                                    setIntake(suggestion);
                                    setIntakeSuggestions([]);
                                }}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
            {loading ? (
                <h1 className='text-center'>Loading...</h1>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2>Results:</h2>
                    {filteredData.length > 0 ? (
                        <section>
                            <ul>
                                {paginatePaper.map((uni, index) => (
                                    <div className='card forPadding' key={index}>
                                        <h5>{uni.name}</h5>
                                        <p><strong>Country:</strong> {uni.country}</p>
                                        <p><strong>Location:</strong> {uni.location || 'NA'}</p>
                                        <p><strong>Courses:</strong> {uni.courses ? uni.courses.join(', ') : 'NA'}</p>
                                        <p><strong>Intakes:</strong> {uni.intakes ? uni.intakes.join(', ') : 'NA'}</p>
                                        <p><strong>Semester Fee:</strong> {uni.semesterFee || 'NA'}</p>
                                        <p><strong>Course Period:</strong> {uni.coursePeriod || 'NA'}</p>
                                        <p><strong>Scholarship:</strong> {uni.scholarship || 'NA'}</p>
                                    </div>
                                ))}
                            </ul>
                            <div className='ul-center my-3'>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="NEXT >>"
                                    onPageChange={handlePageClick}
                                    pageCount={pageCount}
                                    previousLabel="<< previous"
                                    containerClassName={"paginationBtn"}
                                    previousLinkClassName={"PreviousBtn"}
                                    nextLinkClassName={"nextBtn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                />
                            </div>
                        </section>
                    ) : (
                        <p>No universities found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UniversityList;