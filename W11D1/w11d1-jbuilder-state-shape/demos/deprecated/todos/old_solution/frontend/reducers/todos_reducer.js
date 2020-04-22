import {
  RECEIVE_TODOS,
  RECEIVE_TODO,
  REMOVE_TODO,
  TODO_ERROR,
} from '../actions/todo_actions';
import merge from 'lodash/merge';

const todosReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};

  switch(action.type){
    case RECEIVE_TODOS:
      return action.payload.todos;
    case RECEIVE_TODO:
      return merge({}, state, action.payload.todo);
    case REMOVE_TODO:
      nextState = merge({}, state);
      delete nextState[action.payload.todo.id];
      return nextState;
    default:
      return state;
  }
};

export default todosReducer;

// Sample State Shape
// {
//   "1": {
//     id: 1,
//     title: "wash car",
//     body: "with soap",
//     done: false
//   },
//   "2": {
//     id: 2,
//     title: "wash dog",
//     body: "with shampoo",
//     done: true
//   },
// };
