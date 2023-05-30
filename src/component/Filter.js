import React, { useState } from 'react';
import ManageTaskService from '../service/ManageTaskService';

const Filter = ({ onDataChange }) => {
    const [inputText, setInputText] = useState('');
    const [priority, setPriority] = useState('');
    const [state, setState] = useState('');
    const [validText, setValidText] = useState(true);
    const [validState, setValidState] = useState(true);
    const [validPriority, setValidPriority] = useState(true);

    const handleChangeText = (event) => {
        const text = event.target.value;
        setInputText(text);
        setValidText(true);
    };

    const handleChangePriority = (event) => {
        const selectedValue = event.target.value;
        setPriority(selectedValue);
        if (selectedValue === "all") {
            setValidPriority(false);
        } else {
            setValidPriority(true);
        }
    };

    const handleChangeState = (event) => {
        const state = event.target.value;
        setState(state);
        if (state === "all") {
            setValidPriority(false);
        } else {
            setValidState(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputText === '') {
            setValidText(false);
        }
        if (priority === '') {
            setValidPriority(false);
        }
        if (state === '') {
            setValidState(false);
        } else {
            const doneUndone = (state === 'done' ? "true" : "false")
            const filters = {
                text: inputText,
                done: doneUndone,
                priority: priority,
            };
            ManageTaskService.filterTasks(filters)
                .then(response => {
                    const filteredTasks = response.data;
                    onDataChange(filteredTasks)
                });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="form-group row align-items-center">
                    <label for="text" class="col-sm-2 col-form-label" >Name</label>
                    <div class="col-sm-10">
                        <input
                            className={`form-control ${validText ? '' : 'is-invalid'}`}
                            type="text"
                            value={inputText}
                            onChange={handleChangeText}
                            id="text"
                            placeholder="Text"
                        />
                        {!validText && <div className="invalid-feedback">Please enter a value.</div>}
                    </div>
                </div>

                <div class="form-group row align-items-center">
                    <label for="text" class="col-sm-2 col-form-label">Priority</label>
                    <div class="col-sm-4">
                        <select
                            className={`form-control ${validPriority ? '' : 'is-invalid'}`}
                            class="mw-100 p-2 custom-select my-1 mr-sm-2"
                            value={priority}
                            onChange={handleChangePriority}
                            id="inlineFormCustomSelectPref">
                            <option defaultValue value="all">All...</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                            {!validPriority && <div className="invalid-feedback">Please choose an option.</div>}
                        </select>
                    </div>
                </div>

                <div class="form-group row align-items-center">
                    <label for="text" class="col-sm-2 col-form-label">State</label>
                    <div class="col-sm-4">
                        <select
                            className={`form-control ${validState ? '' : 'is-invalid'}`}
                            class="mw-100 p-2 custom-select my-1 mr-sm-2"
                            value={state}
                            onChange={handleChangeState}
                            id="inlineFormCustomSelectPref">
                            <option defaultValue>All...</option>
                            <option value="done">Done</option>
                            <option value="undone">Undone</option>
                            {!validState && <div className="invalid-feedback">Please choose an option.</div>}
                        </select>
                    </div>
                    <div class="col-sm-6 d-flex justify-content-end">
                        <button type="submit" class="btn btn-outline-primary">Search</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Filter;