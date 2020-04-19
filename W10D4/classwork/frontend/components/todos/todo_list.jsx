import React from 'react';
import ToDoListItem from './todo_list_item'

// export default () => <h3>Todo List goes here!</h3>;

export const toDoList = (props) => {
    console.log("props", props);
    return (
      <ul>
        {props.todos.map((toDoOBJ, idx) => {
            console.log(toDoOBJ);
            return (<li key={idx}>
                        <ToDoListItem toDoOBJ={toDoOBJ}/>
                    </li>)
        })}
      </ul>
    )
}