import React, { useEffect, useState } from 'react';
import ManageTaskService from '../service/ManageTaskService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './newTask.css'
import { Pagination } from 'react-bootstrap';

const TodoList = ({ tasksData, dataUpdated }) => {
  const [TasksData, setTasksData] = useState([]);
  const [AllTasks, setAllTasks] = useState([]);
  const [priority, setPriority] = useState('');
  const [validPriority, setValidPriority] = useState(true);
  const [inputText, setInputText] = useState('');
  const [validText, setValidText] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

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

  // handle change for checkboxes 
  const handleChange = (task) => {
    return (event) => {
      if (task.done === true) {
        ManageTaskService.markTaskAsUndone(event.target.id, AllTasks[event.target.id - 1]).then(
          response => {
            refreshItems()
          }
        )
      } else if (task.done === false) {
        ManageTaskService.markTaskAsDone(event.target.id, AllTasks[event.target.id - 1]).then(
          response => {
            refreshItems()
          }
        )
      }
    };
  };

  const handleDelete = (event) => {
    ManageTaskService.deleteTasks(event.target.id).then(
      response => { refreshItems() }
    )
  }

  // submit changes in task 
  const handleEditSubmit = (event) => {
    const data = AllTasks[event.target.id - 1]
    event.preventDefault();
    if (inputText === '') {
      setValidText(false);
    }
    if (priority === '') {
      setValidPriority(false);
    } else {
      const dateFormatted = saveDate()
      console.log(dateFormatted)
      const task = {
        text: inputText,
        dueDate: dateFormatted,
        done: data.done,
        doneDate: data.doneDate,
        priority: priority,
        creationDate: data.creationDate,
      }
      ManageTaskService.updateTask(task, event.target.id)
        .then(response => {
          dataUpdated()
          setPriority(priority)
          setInputText(inputText)
          setSelectedDate(selectedDate)
        })
    }

  };

  // get info to fill edit modal 
  const handleEditData = (event) => {
    const data = AllTasks[event.target.id - 1]
    setPriority(data.priority)
    setInputText(data.text)
    const date = parseISO(data.dueDate);
    if (data.dueDate === null) {
      setSelectedDate(null)
    } else {
      setSelectedDate(date)
    }
  }

  // FUNCTIONS FOR THE EDIT MODAL 
  // handle date 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const saveDate = () => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      return formattedDate
    } else return ""
  };
  // valid priority 
  const handleChangePriority = (event) => {
    const selectedValue = event.target.value;
    setPriority(selectedValue);
    if (selectedValue === "all") {
      setValidPriority(false);
    } else {
      setValidPriority(true);
    }
  };
  // handle text 
  const handleChangeText = (event) => {
    const text = event.target.value;
    setInputText(text);
    setValidText(true);
  };
  // Check if the key is a letter in the date input
  const handleKeyDown = (event) => {
    const key = event.key;
    if (/[a-zA-Z]/.test(key)) {
      event.preventDefault();
    }
  };

  // handle priority sort by ascending and des
  const [prioritySort, setPrioritySort] = useState('');
  const sortPA = () => {
    if (prioritySort === "asc") {
      ManageTaskService.retrieveAllTasksSortedPDD()
        .then(response => {
          setTasksData(response.data)
          setPrioritySort('')
        })
    } else {
      ManageTaskService.retrieveAllTasksSortedPDA()
        .then(response => {
          setTasksData(response.data)
          setPrioritySort('asc')
        })
    }
  }

  // handle duedate sort by ascending and des
  const [dueDateSort, setDueDateSort] = useState('');
  const sortDD = () => {
    if (dueDateSort === "asc") {
      ManageTaskService.retrieveAllTasksSortedDDD()
        .then(response => {
          setTasksData(response.data)
          setDueDateSort('')
        })
    } else {
      ManageTaskService.retrieveAllTasksSortedDDA()
        .then(response => {
          setTasksData(response.data)
          setDueDateSort('asc')
        })
    }
  }

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = TasksData.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                  <th scope="col" class="align-middle">Name</th>
                  <th scope="col">Priority
                    <button onClick={sortPA} type="button" class="btn btn-outline-white p-0 ml-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                      </svg>
                    </button>
                  </th>
                  <th scope="col">Due Date
                    <button onClick={sortDD} type="button" class="btn btn-outline-white p-0 ml-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z" />
                      </svg>
                    </button>
                  </th>
                  <th scope="col" class="align-middle">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentTasks.map((task) => {
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
                          {/* edit  */}
                          <button
                            onClick={handleEditData}
                            id={task.id}
                            type="button"
                            class="btn btn-link"
                            data-toggle="modal"
                            data-target={`#editTask${task.id}`}>
                            Edit
                          </button>
                          {/* modal  */}
                          <div class="modal fade" id={`editTask${task.id}`} tabindex="-1" role="dialog" aria-labelledby="editTask" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">Edit To-Do Task</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <form>
                                    {/* Name  */}
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1">Name</label>
                                      <input
                                        onChange={handleChangeText}
                                        type="text"
                                        className={`form-control ${validText ? '' : 'is-invalid'}`}
                                        class="form-control"
                                        id="text"
                                        value={inputText}
                                        placeholder="Description" />
                                      {!validText && <div className="invalid-feedback">Please enter a value.</div>}
                                    </div>
                                    {/* Priority  */}
                                    <div class="form-group">
                                      <label for="text" >Priority</label>
                                      <select
                                        className={`form-control ${validPriority ? '' : 'is-invalid'}`}
                                        type="text"
                                        class="mw-100 p-2 custom-select my-1 mr-sm-2"
                                        value={priority}
                                        onChange={handleChangePriority}
                                        id="priority">
                                        <option defaultValue value="all">All...</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                        {!validPriority && <div className="invalid-feedback">Please choose an option.</div>}
                                      </select>
                                    </div>
                                    {/* Due Date  */}
                                    <div class="form-group">
                                      <div>
                                        <label for="text" >Due Date *</label>
                                      </div>
                                      <div class="form-group" className="basic-datepicker">
                                        <DatePicker
                                          selected={selectedDate === "invalid" ? "" : selectedDate}
                                          onChange={handleDateChange}
                                          placeholderText="MM/dd/yyyy"
                                          className="custom-datepicker"
                                          class="w-100"
                                          onKeyDown={handleKeyDown}
                                          isClearable
                                          dateFormat="MM/dd/yyyy"
                                        />
                                      </div>
                                      <p class="text-secondary"><small>*Optional</small></p>
                                    </div>
                                  </form>
                                </div>
                                {/* Buttons  */}
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                  <button onClick={handleEditSubmit} id={task.id} type="submit" class="btn btn-primary">
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* delete  */}
                          <button type="submit" class="btn btn-link" id={task.id} onClick={handleDelete}>Delete</button>
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

      {/* PAGINATION  */}
      <div class="col-12 align-self-center d-flex justify-content-center">

      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentTasks.length < tasksPerPage}
        />
      </Pagination>
      </div>
    </div >
  );
};

export default TodoList;