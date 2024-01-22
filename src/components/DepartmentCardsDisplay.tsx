import React from 'react';

import DepartmentCard from './DepartmentCard';


interface DepartmentCardsDisplayProps {
  content: Error | "LOADING" | DepartmentCard[] | null;
}

const DepartmentCardsDisplay: React.FC<DepartmentCardsDisplayProps> = ({ content }) => {
  if(content instanceof Error){
    return <div>gre6ka - {content.toString()}</div>
  }

  if(content === "LOADING"){
    return <div>Loadingggg...</div>
  }

  if (!content) {
    return <div>click here to get started...</div>; 
    // Add loading message or spinner as needed
  } 

  return (
    <div>
        {content.map((departmentCard) => (<DepartmentCard key={departmentCard.id} dCard={departmentCard} />))}
    </div>
  );
};

export default DepartmentCardsDisplay;