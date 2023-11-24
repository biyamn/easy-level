import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Progress = ({ now, label }) => {
  return (
    <ProgressBar
      animated
      now={now}
      label={label}
      variant="info"
      style={{ width: '60%' }}
    />
  );
};

export default Progress;
