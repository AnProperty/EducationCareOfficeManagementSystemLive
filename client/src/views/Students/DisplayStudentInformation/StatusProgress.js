// components/StatusProgress.js
import React from 'react';

import { cilCheckAlt, cilChevronDoubleRight, cilCircle } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

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

  return (
    <div className="d-flex align-items-center w-100">
      {statuses.map((status, index) => (
        <div key={index}>
          {status}
        </div>
      ))}
    </div>
  );
};

export default StatusProgress;
