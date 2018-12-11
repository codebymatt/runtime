import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.sass';

import Landing from './components/Landing'
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
