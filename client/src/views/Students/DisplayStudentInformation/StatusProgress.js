import React from 'react';
import { cilCheckAlt, cilChevronDoubleRight, cilCircle } from '@coreui/icons'; // Import icon paths

const StatusProgress = ({ currentStatus }) => {
  // Updated statuses array
  const statuses = [
    'follow-up',
    'enrolled',
    'application-processing',
    'visa-processing',
    'success',
  ];

  // Determine the index of the current status
  const currentIndex = statuses.indexOf(currentStatus);

  // Helper function to render the icon based on the status using SVG
  const renderIcon = (icon, color = 'currentColor', size = 16) => {
    // Ensure the icon has valid paths and viewBox data
    if (!icon || !icon.svg || !icon.paths || icon.paths.length === 0) {
      return null; // Return null if the icon is not valid
    }

    return (
      <svg
        width={size}
        height={size}
        viewBox={icon.svg.viewBox} // Corrected viewBox usage
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={icon.paths[0]} /> {/* Render icon paths safely */}
      </svg>
    );
  };

  return (
    <div className="d-flex align-items-center w-100">
      {statuses.map((status, index) => (
        <React.Fragment key={status}>
          <div className="d-flex flex-column align-items-center">
            {/* Circle */}
            <div
              className={`d-flex justify-content-center align-items-center rounded-circle ${
                index < currentIndex
                  ? 'bg-success text-white' // Completed
                  : index === currentIndex
                  ? 'bg-primary text-white' // Current
                  : 'bg-white text-muted border border-secondary' // Future
              }`}
              style={{ width: '32px', height: '32px' }}
            >
              {index < currentIndex
                ? renderIcon(cilCheckAlt, '#fff') // Completed step icon
                : index === currentIndex
                ? renderIcon(cilChevronDoubleRight, '#fff') // Current step icon
                : renderIcon(cilCircle, '#6c757d')} // Future step icon
            </div>

            {/* Label */}
            <div className="text-center text-secondary mt-2 text-capitalize">
              {status.replace('-', ' ')}
            </div>
          </div>

          {index < statuses.length - 1 && (
            <div
              className="flex-grow-1 position-relative"
              style={{
                height: '4px',
                backgroundColor: index < currentIndex ? '#008080' : '#d3d3d3', // Green for completed, light gray for future
                margin: '0 8px',
              }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusProgress;
