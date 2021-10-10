import React, { useState } from 'react';
import "./App.css";
import TodoTable from "./TodoTable";

const Todolist = () => {
  //cd Documents/Koulu/Front end/todolist
  const [input, setInput] = useState({desc:"", date:""});
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setInput({...input, [event.target.name]: event.target.value});
  };

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
  }

  const deleteItem = (id) => {
    const newArray = todos.filter((todo, i) => i !== id)
    setTodos(newArray);
  }

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <label for="date">Date:</label>
        <input type="date" name="date" onChange={inputChanged} value={input.date}/>
        <label for="desc">Description:</label>
        <input type="text" name="desc" onChange={inputChanged} value={input.desc}/>
        <input type="submit" value="Add"/>
      </form>
      <TodoTable todos={todos} delete={deleteItem}/>
    </div>
  );
};

export default Todolist;
