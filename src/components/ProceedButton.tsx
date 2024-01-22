import React, { useState } from 'react';
import Departments from './Departments';

interface ProceedButtonProps {
  jsonData: any;
  // Adjust the type based on your actual JSON structure
}

const ProceedButton: React.FC<ProceedButtonProps> = ({ jsonData }) => {
  const [proceedClicked, setProceedClicked] = useState(false);

  const handleProceedClick = () => {
    setProceedClicked(true);
  };

  return (
    <div>
      <button onClick={handleProceedClick}>PROCEED</button>
      {proceedClicked && <Departments data={jsonData} />}
    </div>
  );
};

export default ProceedButton;