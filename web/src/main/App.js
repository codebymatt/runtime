import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.sass';

import Dashboard from './components/Dashboard';
import Landing from './components/Landing'
import Login from './components/Login';
import Settings from './components/Settings';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: JSON.parse(localStorage.getItem('user')) || {} }
  }

  setUser = (userObject) => {
    this.setState(
      { user: userObject }, () =>
        localStorage.setItem('user', JSON.stringify(this.state.user))
    );
  }
  render() {
    return (
      <div className='app-container'>
        <Switch>
          <Route exact path='/' render={( ) => <Landing setUser={this.setUser} /> } />
          <Route exact path='/login' render={( ) => <Login setUser={this.setUser}/> } />
          <Route exact path='/dashboard' render={( ) => <Dashboard user={this.state.user} /> } />
          <Route exact path='/settings' render={( ) => <Settings user={this.state.user} /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
