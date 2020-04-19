import React from 'react';
import { Provider } from 'react-redux';
// import configureStore from '../store/store'
import App from './app';

// const store = configureStore();

export const Root = ({store}) => {
    return (
    <Provider store = {store}>
        <App />
    </Provider>
  )
}

// export default Root;

