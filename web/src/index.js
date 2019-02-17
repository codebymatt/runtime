import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import './index.sass';
import App from './main/App.js';
import * as serviceWorker from './serviceWorker';
import Axios from 'axios';

Axios.defaults.withCredentials = true
if (process.env.RUNTIME_ENV === "production") {
  Axios.defaults.baseURL = 'https://api.runtime.mattcraig.me'
} else{
  Axios.defaults.baseURL = 'http://localhost:3000'
}

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.get['Content-Type'] = 'application/json';
Axios.defaults.headers.put['Content-Type'] = 'application/json';

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
