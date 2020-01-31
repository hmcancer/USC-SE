import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import 'font-awesome/css/font-awesome.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import rootReducer from './reducer';
import App from './components/App';

render(
  <Provider store={createStore(rootReducer, undefined, applyMiddleware(thunk))}>
    <App />
  </Provider>,
  document.getElementById('root')
);
