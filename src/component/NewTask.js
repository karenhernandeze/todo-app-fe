import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './newTask.css'
import ManageTaskService from '../service/ManageTaskService';

const NewTask = ({ dataUpdated }) => {
  const [priority, setPriority] = useState('');
  const [validPriority, setValidPriority] = useState(true);
  const [inputText, setInputText] = useState('');
  const [validText, setValidText] = useState(true);
  const [limitText, setLimitText] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  // handle date 
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date)
  };
  const saveDate = () => {
    console.log(selectedDate)
    if (selectedDate != null) {
      console.log("HERE?")
      const year = selectedDate.getUTCFullYear();
      const month = String(selectedDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getUTCDate()).padStart(2, '0');
      const hours = String(selectedDate.getUTCHours()).padStart(2, '0');
      const minutes = String(selectedDate.getUTCMinutes()).padStart(2, '0');
      const seconds = String(selectedDate.getUTCSeconds()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      return formattedDate
    } else{
      console.log("Here")
      return null

    } 
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
    if (inputText.length >= 120) {
      setLimitText(false)
    } else {
      setLimitText(true)
    }
  };
  // Check if the key is a letter in the date input
  const handleKeyDown = (event) => {
    const key = event.key;
    if (/[a-zA-Z]/.test(key)) {
      event.preventDefault();
    }
  };
  // create object to be sent
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputText === '') {
      setValidText(false);
    }
    if (priority === '') {
      setValidPriority(false);
    } else {
      const dateDue = saveDate()
      console.log(dateDue)
      const dateNow = new Date();
      // FORMAT DATA TO THE DESIRED OUTPUT => yyyy-MM-ddTHH:mm:ss 
      const year = dateNow.getUTCFullYear();
      const month = String(dateNow.getUTCMonth() + 1).padStart(2, '0');
      const day = String(dateNow.getUTCDate()).padStart(2, '0');
      const hours = String(dateNow.getUTCHours()).padStart(2, '0');
      const minutes = String(dateNow.getUTCMinutes()).padStart(2, '0');
      const seconds = String(dateNow.getUTCSeconds()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      console.log(formattedDate)

      const task = {
        text: inputText,
        dueDate: dateDue,
        done: false,
        doneDate: "",
        priority: priority,
        creationDate: formattedDate,
      }
      ManageTaskService.createTasks(task)
        .then(response => {
          dataUpdated()
          setInputText('');
          setPriority('');
          setSelectedDate(null);
        });
    }
  };


  return (
    <div class="col-3 .col-md-3">
      <button type="button" class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center" data-toggle="modal" data-target="#createTask">Create Task
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </button>
      <div class="modal fade" id="createTask" tabindex="-1" role="dialog" aria-labelledby="createTask" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">New To-Do Task</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Name  */}
                <div class="form-group">
                  <label for="exampleFormControlInput1">Name</label>
                  <input
                    onChange={handleChangeText}
                    type="text"
                    className={`form-control ${!limitText || !validText ? 'is-invalid' : ''}`}
                    class="form-control"
                    id="text"
                    value={inputText}
                    placeholder="Description" />
                  {!validText && <div className="invalid-feedback">Please enter a value.</div>}
                  {!limitText && <div className="invalid-feedback">Limit of 120 chars.</div>}
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
                      selected={selectedDate}
                      onChange={handleDateChange}
                      placeholderText="MM/dd/yyyy"
                      className="custom-datepicker"
                      class="w-100"
                      onKeyDown={handleKeyDown}
                      isClearable
                    // dateFormat="MM/dd/yyyy"
                    />
                  </div>
                  <p class="text-secondary"><small>*Optional</small></p>
                </div>
              </form>
            </div>
            {/* Buttons  */}
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={handleSubmit} type="submit" class="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;