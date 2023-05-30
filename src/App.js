import './App.css';
import React, { useState, useEffect } from 'react';
import Filter from './component/Filter';
import Metrics from './component/Metrics';
import NewTask from './component/NewTask';
import TodoList from './component/TodoList'
import ManageTaskService from './service/ManageTaskService';

function App() {
  const [data, setData] = useState([]);
  const [dataMetrics, setDataMetrics] = useState('');
  const [dataMetricsLow, setDataMetricsLow] = useState('');
  const [dataMetricsMed, setDataMetricsMed] = useState('');
  const [dataMetricsHigh, setDataMetricsHigh] = useState('');

  useEffect(() => {
    if (data.length === 0) {
      ManageTaskService.retrieveAllTasks()
        .then(response => {
          setData(response.data);
        })
    }
    ManageTaskService.retrieveAvgTime()
      .then(response => { setDataMetrics(response.data) });

    ManageTaskService.retrieveAvgTimeLow()
      .then(response => { setDataMetricsLow(response.data) })

    ManageTaskService.retrieveAvgTimeMedium()
      .then(response => { setDataMetricsMed(response.data) })

    ManageTaskService.retrieveAvgTimeHigh()
      .then(response => { setDataMetricsHigh(response.data) })
  }, [data]);

  const handleDataChange = (newData) => {
    console.log(newData)
    setData(newData);
  };

  const updateData = () => {
    ManageTaskService.retrieveAllTasks()
      .then(response => { setData(response.data) })
  }

  const doneUndone = () => {
    ManageTaskService.retrieveAvgTime()
      .then(response => { setDataMetrics(response.data) });

    ManageTaskService.retrieveAvgTimeLow()
      .then(response => { setDataMetricsLow(response.data) })

    ManageTaskService.retrieveAvgTimeMedium()
      .then(response => { setDataMetricsMed(response.data) })

    ManageTaskService.retrieveAvgTimeHigh()
      .then(response => { setDataMetricsHigh(response.data) })
  }

  return (
    <div class="container shadow-lg p-3 mb-5 bg-white rounded mt-4">
      <div class="container mt-4">
        <Filter tasksData={data} onDataChange={handleDataChange} />
      </div>

      <div class="container mt-3 mb-3">
        <NewTask dataUpdated={updateData} />
      </div>

      <div class="container" className="App">
        <TodoList tasksData={data} dataUpdated={updateData} doneUndone={doneUndone} />
      </div>


      <div class="container">
        <Metrics avgTime={dataMetrics} avgTimeLow={dataMetricsLow} avgTimeMedium={dataMetricsMed} avgTimeHigh={dataMetricsHigh} />
      </div>
    </div>


  );
}

export default App;
