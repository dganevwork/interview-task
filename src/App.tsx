import React, { useState } from 'react';


import ContentCover from './components/ContentCover';

import DepartmentCard from './components/DepartmentCard';

import {ReactComponent as Spinner} from './icons/TailSpin.svg';
import {ReactComponent as DownloadIcon} from './icons/DownloadIcon.svg';
import {ReactComponent as AsialLogo} from './icons/AsialLogo.svg';

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
  const [isLoading, setIsLoading] = useState<any>(null)

  const fetchData  = async () => {
    setIsLoading(true);
    setContentDisplay("LOADING");
    await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const departmentResponse = await fetch('/departments.json');
        const departmentData = await departmentResponse.json();

        const employeeResponse = await fetch('/employees.json');
        const employeeData = await employeeResponse.json();

        const departmentsWithEmployees = createDepartmentsWithEmployees(departmentData.departments, employeeData.employees);

        const departmentCards = createDepartmentCards(departmentsWithEmployees);
        setContentDisplay(departmentCards);  

      } catch (error) {
        console.error('Error fetching data:', error);
        if(error){setContentDisplay(error);}
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="App">
      <header className="App-header" >
        <div>
          <AsialLogo/> <span>採用システム</span>
        </div>
      </header>

      <div className="App-content">
        
        <div className="Main-column">
          <div className="Title row">
            <div className="Action-title"> <p className="h2">各部署の29歳以下のメンバー割合</p> </div>
            <div className="Action-button">
              <button disabled={isLoading} onClick={fetchData}>
                {isLoading ?  <Spinner className="spinner"/> : <DownloadIcon/>}  {isLoading ? "loading..." : "情報を取得"}
              </button>
            </div>
          </div>
          <div className="Display row">
            <ContentCover content={contentDisplay} />
          </div>
        </div>
      </div>

      <footer className="App-footer">COPYRIGHT ASIAL CORPORATION. ALL RIGHTS RESERVED.</footer>
    </div>
  );
};

export default App;