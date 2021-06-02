import React from 'react';
import './ExplanationBox.css';

const ExplanationBox = ({
  message,
  opacity,
}: {
  message: string;
  opacity: number;
}) => {
  return (
    <div className='ExplanationBox' style={{ opacity }}>
      {message}
    </div>
  );
};

export default ExplanationBox;
