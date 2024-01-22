import React from 'react';

import DepartmentCard from './DepartmentCard';

import Placeholder from './Placeholder';


interface ContentCoverProps {
  content: Error | "LOADING" | DepartmentCard[] | null;
}

const ContentCover: React.FC<ContentCoverProps> = ({ content }) => {
  if(content instanceof Error){
    return <Placeholder content="ERROR"/>;
  }

  if(content === "LOADING"){
    return <Placeholder content="LOADING"/>;
  }

  if (!content) {
    return <Placeholder content="DEFAULT"/>;
  } 

  return (
    <div>
        {content.map((departmentCard) => (<DepartmentCard key={departmentCard.id} dCard={departmentCard} />))}
    </div>
  );
};

export default ContentCover;