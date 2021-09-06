import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./reducers";



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store} >
      <App  />
    </Provider>
  </BrowserRouter>,

  document.getElementById('root')
);


