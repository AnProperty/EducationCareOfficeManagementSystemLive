import React from 'react';
import { cilCheckAlt, cilChevronDoubleRight, cilCircle } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';

const StatusProgress = ({ currentStatus }) => {
  // Statuses array
  const statuses = [
    'follow-up',
    'enrolled',
    'application-processing',
    'visa-processing',
    'success',
  ];

  // Determine the index of the current status
  const currentIndex = statuses.indexOf(currentStatus);

  // Helper function to render the icon based on the status
  const renderIcon = (index) => {
    if (index < currentIndex) {
      return <CIcon icon={cilCheckAlt} className="text-white" />; // Checkmark for completed
    } else if (index === currentIndex) {
      return <CIcon icon={cilChevronDoubleRight} className="text-white" />; // Current step indicator
    } else {
      return <CIcon icon={cilCircle} className="text-secondary" />; // Placeholder circle for future steps
    }
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
              {renderIcon(index)}
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
