import { RECEIVE_TODO, RECEIVE_TODOS }from '../actions/todo_actions'
import { receiveToDo, receiveToDos } from '../actions/todo_actions'

const todosReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_TODO:
      nextState[action.todo.id] = action.todo;  
      return nextState;
    case RECEIVE_TODOS:
      action.todos.forEach((todo)=>{
        nextState[todo.id] = todo;
      })
      return nextState
    default:
      return state;
  }

}

export default todosReducer;