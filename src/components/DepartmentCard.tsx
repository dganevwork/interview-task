import React from 'react';

type DepartmentCard = {
  id: number;
  name: string;
  lessThan29: number;
  lessThan39: number;
  older: number;
  total: number;
}

interface DepartmentCardProps {
  departmentCard: DepartmentCard;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ( {departmentCard} ) => {
  return (
      <div key={departmentCard.id} className="card">
        <h2>{departmentCard.name} - {departmentCard.total}</h2>
      </div>
  );
};

export default DepartmentCard;