import React, { useState, useRef } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import "./App.css";

const Todolist = () => {
  //cd Documents/Koulu/Front end/todolist
  const [input, setInput] = useState({desc:"", date:"", priority:""});
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

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
    setInput({desc:"", date:"", priority:""});
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
        <label for="desc">Description:</label>
        <input type="text" name="desc" onChange={inputChanged} value={input.desc}/>
        <label for="date">Date:</label>
        <input type="date" name="date" onChange={inputChanged} value={input.date}/>
        <label for="priority">Priority:</label>
        <input type="text" name="priority" onChange={inputChanged} value={input.priority}/>
        <input type="submit" value="Add"/>
      </form>
      
      
      <div className="ag-theme-alpine" style={{height: 400, width: 600, margin: "auto"}}>
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
       <button onClick={deleteItem}>Delete</button>
    </div>
  );
};

export default Todolist;
