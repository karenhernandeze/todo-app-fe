import './App.css';
import React, { useState, useEffect } from 'react';
import Filter from './component/Filter';
import Metrics from './component/Metrics';
import NewTask from './component/NewTask';
import TodoList from './component/TodoList'
import ManageTaskService from './service/ManageTaskService';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0){
      ManageTaskService.retrieveAllTasks()
      .then(response => {
        setData(response.data);
      })
    } 
  }, [data]);

  const handleDataChange = (newData) => {
    console.log(newData)
    setData(newData);
  };

  return (
    <div class="container shadow-lg p-3 mb-5 bg-white rounded mt-4">
      <div class="container mt-4">
        <Filter tasksData={data} onDataChange={handleDataChange}/>
      </div>

      <div class="container mt-3 mb-3">
        <NewTask />
      </div>

      <div class="container" className="App">
        <TodoList tasksData={data}/>
      </div>


      <div class="container">
        <Metrics />
      </div>
    </div>


  );
}

export default App;
