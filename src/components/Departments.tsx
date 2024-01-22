import React from 'react';

interface Department {
  id: number;
  name: string;
}

interface DepartmentsProps {
  data: Department[] | null;
  // Allow data to be null initially
}

const Departments: React.FC<DepartmentsProps> = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>; 
    // Add loading message or spinner as needed
  }

  return (
    <div>
      {data.map((department) => (
        <div key={department.id} className="card">
          <h2>{department.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Departments;