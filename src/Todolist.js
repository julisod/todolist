import React, { useState, useRef } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';

import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


import "./App.css";

const Todolist = () => {
  //cd Documents/Koulu/Front end/todolist
  const [input, setInput] = useState({desc:"", date:(new Date()), priority:""});
  const [todos, setTodos] = useState([]);
  const [cantDelete, setCantDelete] = useState("");

  const gridRef = useRef();

  const columns = [
    {field: "desc", sortable: true, filter:true, headerName: "Description"},
    {field: "date", sortable: true, filter:true},
    {field: "priority", sortable: true, filter:true,
    cellStyle:params=> params.value === "high"? {color:'red'}: {color:'black'}}
  ]

  const inputChanged = (event) => {
    setInput({...input, [event.target.name]: event.target.value});
  };

  const changeDate = (newValue) => {
    setInput({...input, date: newValue});
  };

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
    setInput({desc:"", date:null, priority:""});
  }

  const deleteItem = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
    setTodos(todos.filter((todo, i) => i !== gridRef.current.getSelectedNodes()[0].childIndex))
    } else {
      setCantDelete("select a row first");
    }
  }

  //if user selects a row, we can clear the message about having to select a row first
  const clearMessage = () => {
    setCantDelete("");
  }

  return (
    <div className="App">
      <br></br>
      <form onSubmit={addTodo}>
        <TextField name="desc" variant="standard" label="Description" onChange={inputChanged} value={input.desc} required/>
        <TextField name="priority" variant="standard" label="Priority" onChange={inputChanged} value={input.priority}/>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            name="date"
            label="Date"
            inputFormat="MM/dd/yyyy"
            value={input.date}
            onChange={changeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained" endIcon={<AddCircleOutlineIcon />}>Add</Button>
      </form>
      
      
      <div className="ag-theme-alpine" style={{height: 400, width: 600, margin: "auto"}}>
        {/*haluisin keksiä miten ton taulukon ympärille saa enemmän tyhjää tilaa*/}
        <AgGridReact
          onRowSelected={clearMessage}
          rowData={todos}
          columnDefs={columns}
          ref={gridRef}
          rowSelection="single"
          onGridReady={params => gridRef.current = params.api}
        />
       </div>
       <p>{cantDelete}</p>
       <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteItem}>Delete</Button>
    </div>
  );
};

export default Todolist;
