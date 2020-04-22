import {
  RECEIVE_TODOS,
  RECEIVE_TODO,
} from '../actions/todo_actions';
import merge from 'lodash/merge';

const tagsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};

  switch(action.type){
    case RECEIVE_TODOS :
      if (action.payload.tags) {
        return action.payload.tags;
      } else {
        return {};
      }
    case RECEIVE_TODO:
      if (action.payload.tags) {
        return merge({}, state, action.payload.tags);
      } else {
        return {};
      }
    default:
      return state;
  }
};

export default tagsReducer;
