import React from 'react';
import ReactDOM from 'react-dom';
import {Root} from './components/root';
import App from './components/app';
import configureStore from './store/store';
import { receiveToDo, receiveToDos } from './actions/todo_actions'
import {allToDos} from './reducers/selectors'

document.addEventListener("DOMContentLoaded", ()=> {
    const root = document.getElementById('root');
    const store = configureStore();
    window.store = store;
    window.receiveToDo = receiveToDo;
    window.receiveToDos = receiveToDos;
    window.allToDos = allToDos;

    ReactDOM.render(<Root store={store} />, root)
})