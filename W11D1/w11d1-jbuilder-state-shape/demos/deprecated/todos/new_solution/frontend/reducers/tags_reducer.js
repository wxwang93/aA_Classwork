import {
  RECEIVE_TODOS,
  RECEIVE_TODO,
  REMOVE_TODO,
  TODO_ERROR,
} from '../actions/todo_actions';
import merge from 'lodash/merge';

const tagsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_TODOS:
        return action.payload.tags;
    case RECEIVE_TODO:
      return merge({}, state, action.payload.tags)
    default:
      return state;
  }
};

export default tagsReducer;