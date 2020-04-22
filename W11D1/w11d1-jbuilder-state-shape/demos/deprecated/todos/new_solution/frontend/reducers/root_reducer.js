import { combineReducers } from 'redux';

import todosReducer from './todos_reducer';
import stepsReducer from './steps_reducer';
import errorsReducer from './error_reducer';
import tags from './tags_reducer';
import taggings from './taggings_reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  steps: stepsReducer,
  errors: errorsReducer,
  tags,
  taggings,
 });

export default rootReducer;
