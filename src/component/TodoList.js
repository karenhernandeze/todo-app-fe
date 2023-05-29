import React, { useEffect, useState } from 'react';
import ManageTaskService from '../service/ManageTaskService';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoList = ({ tasksData }) => {
  const [TasksData, setTasksData] = useState([]);
  const [AllTasks, setAllTasks] = useState([]);

  useEffect(() => {
    setTasksData(tasksData)
    ManageTaskService.retrieveAllTasks().then(
      response => {
        setAllTasks(response.data)
      }
    )
  }, [tasksData])

  const refreshItems = () => {
    ManageTaskService.retrieveAllTasks().then(
      response => {
        setTasksData(response.data)
      }
    )
  }

  const handleChange = (task) => {
    return (event) => {
      if (task.done == true) {
        ManageTaskService.markTaskAsUndone(event.target.id, AllTasks[event.target.id - 1]).then(
          response => {
            refreshItems()
          }
        )
      } else if (task.done == false) {
        ManageTaskService.markTaskAsDone(event.target.id, AllTasks[event.target.id - 1]).then(
          response => {
            refreshItems()
          }
        )
      }
    };
  };

  return (
    <div class="row h-100">

      <div class="col-12 align-self-start h-75">
        <div class="row align-items-start">
          <div class="col">
            <table class="table table-hover h-75">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "40px" }}> </th>
                  <th scope="col">Name</th>
                  <th scope="col">Priority
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up ml-3" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                  </th>
                  <th scope="col">Due Date
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up ml-3" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                  </th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  TasksData.map((task) => {
                    return (
                      <tr>
                        <th class="align-middle">
                          <div class="form-group form-check">
                            <input type="checkbox" onChange={handleChange(task)} class="form-check-input" id={task.id} checked={task.done} />
                          </div>
                        </th>
                        <td class="align-middle">
                          {task.text}
                        </td>
                        <td class="align-middle">
                          {task.priority}
                        </td>
                        <td class="align-middle">
                          {task.dueDate}
                        </td>
                        <td>
                          <button type="submit" class="btn btn-link">Edit</button>

                          <button type="button" class="btn btn-link">Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-12 align-self-center d-flex justify-content-center">
        <div class="row">
          <div class="col">
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item disabled">
                  <a class="page-link">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active" aria-current="page">
                  <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div >
  );
};

export default TodoList;