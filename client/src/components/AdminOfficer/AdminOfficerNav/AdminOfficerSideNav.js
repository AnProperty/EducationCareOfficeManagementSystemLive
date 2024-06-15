/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import React from 'react';
import './AdminOfficerDashBoard.css'
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
const AdminOfficerSideNav = () => {
    const logOut = () =>{
        localStorage.removeItem("user")
    }
    return (
        <div className='forAdminOfficer'>

            <div>

                <div className="wrapper d-flex flex-column min-vh-100">
                    <div id="nav-bar">
                        <input id="nav-toggle" type="checkbox" />
                        <div id="nav-header"><Link id="nav-title" to="/admin-officer/dashboard"><img src={logo} alt="" style={{ height: "90px", width: "155px", borderRadius: "15px", padding: "10px 0px 10px 0px" }} /></Link>
                            <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
                            <hr />
                        </div>
                        <div id="nav-content">

                            <Link to="/admin-officer/works">
                                <div className="nav-button">
                                    <i className="fas fa-palette"></i><span>Your Work</span>
                                </div>
                            </Link>

                            <div className="nav-button"><i className="fas fa-images"></i><span>Assets</span></div>
                            <div className="nav-button"><i className="fas fa-thumbtack"></i><span>Pinned Items</span></div>
                            <hr />
                            <div className="nav-button"><i className="fas fa-heart"></i><span>Following</span></div>
                            <div className="nav-button"><i className="fas fa-chart-line"></i><span>Trending</span></div>
                            <div className="nav-button"><i className="fas fa-fire"></i><span>Challenges</span></div>
                            <div className="nav-button"><i className="fas fa-magic"></i><span>Spark</span></div>
                            <hr />
                            <div className="nav-button"><i className="fas fa-gem"></i><span>Codepen Pro</span></div>
                            <div id="nav-content-highlight"></div>
                        </div>
                        <input id="nav-footer-toggle" type="checkbox" />
                        <div id="nav-footer">
                            <div>
                                <Link to='/login' onClick={()=>logOut()}><h3 className='text-center'>LogOut</h3></Link>
                            </div>
                            
                        </div>
                    </div>


                </div>
            </div>


        </div>
    );
};

export default AdminOfficerSideNav;