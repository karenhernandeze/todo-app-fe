import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [filteredTasks, setFilteredTasks] = useState([]);
  
    const updateFilteredTasks = (tasks) => {
      setFilteredTasks(tasks);
    };
  
    return (
      <TaskContext.Provider value={{ filteredTasks, updateFilteredTasks }}>
        {children}
      </TaskContext.Provider>
    );
  };
  