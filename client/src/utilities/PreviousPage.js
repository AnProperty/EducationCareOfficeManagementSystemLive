import React from 'react';
import { useNavigate } from 'react-router-dom';

const PreviousButton = () => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <button onClick={handlePrevious} className='btn btn4'>
      &lt;&lt; Pre
    </button>
  );
};

export default PreviousButton;
