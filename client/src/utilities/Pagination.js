import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    onPageChange(page);
  };


  return (
    <div className='text-center mt-4'>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handleClick(index + 1)}
          className={index + 1 === currentPage ? "btn2" : "m-1 p-2"}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
