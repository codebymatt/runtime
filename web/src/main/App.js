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
    this.state = {
      user: JSON.parse(localStorage.getItem('user')) || {},
      loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || false
    }
  }

  // setUser = (userObject) => {
  //   this.setState(
  //     { user: userObject }, () =>
  //       localStorage.setItem('user', JSON.stringify(this.state.user))
  //   );
  // }

  setUser = (userObject) => {
    this.setPersistentState('user', userObject)
  }

  // persistLogin = () => {
  //   this.setState(
  //     { loggedIn: true }, () =>
  //       localStorage.setItem('loggedIn', JSON.stringify(this.state.loggedIn))
  //   );
  // }

  persistLogin = () => {
    this.setPersistentState('loggedIn', true);
  }

  setPersistentState = (key, val) => {
    this.setState(
      { [key]: val }, () => {
        localStorage.setItem(key, JSON.stringify(this.state[key]))
      }
    )
  }

  render() {
    return (
      <div className='app-container'>
        <Switch>
          <Route exact path='/' render={( ) => <Landing setUser={this.setUser} /> } />
          <Route exact path='/login' render={( ) => <Login loggedIn={this.state.loggedIn} persistLogin={this.persistLogin} setUser={this.setUser}/> } />
          <Route exact path='/dashboard' render={( ) => <Dashboard user={this.state.user} /> } />
          <Route exact path='/settings' render={( ) => <Settings user={this.state.user} /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
