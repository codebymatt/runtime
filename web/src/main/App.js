import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.sass';

import Dashboard from './components/Dashboard';
import Landing from './components/Landing'
import Login from './components/Login';
import Settings from './components/Settings';

class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/settings' component={Settings} />
        </Switch>
      </div>
    );
  }
}

export default App;
