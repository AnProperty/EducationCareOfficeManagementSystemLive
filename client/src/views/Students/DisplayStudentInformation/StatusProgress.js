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
      <h1>Status</h1>
    </div>
  );
};

export default StatusProgress;
