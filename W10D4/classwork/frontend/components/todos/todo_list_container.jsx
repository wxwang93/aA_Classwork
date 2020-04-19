import React from 'react';
import {connect} from 'react-redux'
import {allToDos} from '../../reducers/selectors'
// import toDoList from './todo_list'
import {toDoList} from './todo_list'
import {receiveToDo, receiveToDos} from '../../actions/todo_actions'

const mapStateToProps = (state) => ({
    todos: allToDos(state)
}); 

const mapDispatchToProps = (dispatch) => ({
    // return {
        receiveToDo: (todo) => dispatch(receiveToDo(todo)),
        receiveToDos: (todos) => dispatch(receiveToDos(todos))
    // }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toDoList);