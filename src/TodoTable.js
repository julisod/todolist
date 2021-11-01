import React from 'react';


//this code is not needed anymore, but i'm just going leave this here as an example


function TodoTable(props) {
    return(
        <div>
            <table><tbody>
                <tr>
                <th>Date</th>
                <th>Description</th>
                </tr>
                {props.todos.map((todo, index) =>
                <tr key={index}>
                <td>{todo.date}</td>
                <td>{todo.desc}</td>
                <button onClick={() => props.delete(index)}>Delete</button>
                </tr>)
                }
            </tbody></table> 
        </div>
    );
}
export default TodoTable;