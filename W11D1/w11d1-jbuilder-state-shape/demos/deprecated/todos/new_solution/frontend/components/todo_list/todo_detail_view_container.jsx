import { connect } from 'react-redux';
import TodoDetailView from './todo_detail_view';
// Actions
import { deleteTodo } from '../../actions/todo_actions';
import { requestSteps } from '../../actions/step_actions';

const selectTagIds = function(state, id) {
  return Object.values(state.taggings)
    .filter(tagging => tagging.todo_id === id)
    .map(tagging => state.tags[tagging.tag_id])
}


const mStP = (state, {todo}) => {
  const tags = selectTagIds(state, todo.id);

  return {
    tags
  }
}



const mapDispatchToProps = (dispatch, { todo }) => ({
  requestSteps: () => dispatch(requestSteps(todo.id)),
  destroyTodo: () => dispatch(deleteTodo(todo))
});


export default connect(
  mStP, // todo props is already passed in
  mapDispatchToProps
)(TodoDetailView);
