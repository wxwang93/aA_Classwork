import {
  RECEIVE_TODOS,
  RECEIVE_TODO,
  REMOVE_TODO,
  TODO_ERROR,
} from '../actions/todo_actions';
import merge from 'lodash/merge';

const taggingReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_TODOS:
        return action.payload.taggings;
    case RECEIVE_TODO:
      return merge({}, state, action.payload.taggings)
    default:
      return state;
  }
};

export default taggingReducer;