import React, { useState, useEffect } from 'react';


import Loading from './components/Loading';
import ProceedButton from './components/ProceedButton';

import logo from './logo.svg';
import './App.scss';

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/departments.json');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <header className="App-header" />
      <h1>Departments App</h1>
      <ProceedButton jsonData={jsonData} />
    </div>
  );
};

export default App;