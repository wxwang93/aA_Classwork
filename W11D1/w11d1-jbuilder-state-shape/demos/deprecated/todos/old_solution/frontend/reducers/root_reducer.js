import { combineReducers } from 'redux';

import todosReducer from './todos_reducer';
import stepsReducer from './steps_reducer';
import errorsReducer from './error_reducer';
import tagsReducer from './tags_reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  steps: stepsReducer,
  errors: errorsReducer,
  tags: tagsReducer
 });

export default rootReducer;
