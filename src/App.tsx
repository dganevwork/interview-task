import React, { useState, useEffect } from 'react';


import DepartmentCardsDisplay from './components/DepartmentCardsDisplay';

import logo from './logo.svg';
import './App.scss';

type Department = {
  id: number;
  name: string;
}

type Employee = {
  id: number;
  department_id: number;
  birth_date: string;
}

type DepartmentWithEmployees = {
  id: number;
  name: string;
  employees: Employee[];
}

type DepartmentCard = {
  id: number;
  name: string;
  lessThan29: number;
  lessThan39: number;
  older: number;
  total: number;
}


interface ContentProps {
  departmentData: Department[] | null;
  employeeData: Employee[] | null;
}

const compactDate = (ymdDate: Date) => {
  return Number(ymdDate.toISOString().slice(0,10).replace(/-/g,''));
}

const ageFromDate = (birth_date: Date | string) => {
  return Math.floor(
    (
      compactDate(new Date() ) - 
      compactDate(new Date(birth_date) )
    )/10000
  );
}

const isYoung = (birth_date: Date | string) => {
  return ageFromDate(birth_date) < 29;
}

const isMid = (birth_date: Date | string) => {
  const age=ageFromDate(birth_date);
  return  (age>= 29 && age<39);
}

const isSenior = (birth_date: Date | string) => {
  return ageFromDate(birth_date) >= 39;
}

const createDepartmentsWithEmployees = (departments: Department[], employees: Employee[]): DepartmentWithEmployees[] => {
  
  const employeesByDepartment = employees.reduce(function (r, emp) {
        r[emp.department_id] = r[emp.department_id] || [];
        r[emp.department_id].push(emp);
        return r;
    }, Object.create(null));

  const departmentsWithEmployees: DepartmentWithEmployees[] = departments.map(
    (dep) => ({
      ...dep,
      employees: employeesByDepartment[dep.id] || [],
    })
  );

  return departmentsWithEmployees;
}

const createDepartmentCards = (departmentsWithEmployees: DepartmentWithEmployees[]) : Object[] => {
  //can be done with reduce, but would not be as readable.
  const depCards: DepartmentCard[] = departmentsWithEmployees.map(
    (dep) => ({
      id: dep.id,
      name: dep.name,
      lessThan29: dep.employees.filter(ee => isYoung(ee.birth_date)).length,
      lessThan39: dep.employees.filter(ee => isMid(ee.birth_date)).length,
      older: dep.employees.filter(ee => isSenior(ee.birth_date)).length,
      total: dep.employees.length
    })
  );

  return depCards;
}


const App: React.FC = () => {
  const [contentDisplay, setContentDisplay] = useState<any>(null)

  const fetchData  = async () => {
    setContentDisplay("LOADING");
    await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const departmentResponse = await fetch('/departments.json');
        const departmentData = await departmentResponse.json();

        const employeeResponse = await fetch('/employees.json');
        const employeeData = await employeeResponse.json();

        const departmentsWithEmployees = createDepartmentsWithEmployees(departmentData, employeeData);

        const departmentCards = createDepartmentCards(departmentsWithEmployees);

        setContentDisplay(departmentCards);  
      } catch (error) {
        console.error('Error fetching data:', error);
        if(error){setContentDisplay(error);}
      } finally {
        // success
      }
  };

  return (
    <div className="App">
      <header className="App-header" >
        LOGO ASIAL CORP
      </header>

      <div className="App-content">
        
        <div className="Main-column">
          <div className="Title row">
            <div className="Action-title"> <h2>Members under 29</h2> </div>
            <div className="Action-button">
              <button onClick={fetchData}>Get info</button>
            </div>
          </div>
          <div className="Display row">
            <DepartmentCardsDisplay content={contentDisplay} />
          </div>
        </div>
      </div>

      <footer className="App-footer" >
        <hr/>
        COPYRIGHT TEXT
      </footer>
    </div>
  );
};

export default App;