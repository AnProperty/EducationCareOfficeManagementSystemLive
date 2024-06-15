import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="Landing2">
      <header className="siteHeader">
        <div className="overlay">
          <ul className="forOverlay">
            <li><h1>Welcome To Education Care</h1></li>
            <li>
              <Link to="/login">
                <button type="button" className="btn btn-outline-info">Log In</button>
              </Link>
            </li>
            <li><h3>Move Abroad Safely</h3></li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
