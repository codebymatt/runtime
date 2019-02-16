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

  setUser = (userObject) => {
    this.setPersistentState('user', userObject)
  }

  refreshState = () => {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')) || {},
      loggedIn: this.userLoggedIn()
    })
  }

  userLoggedIn = () => JSON.parse(localStorage.getItem('loggedIn')) || false

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
          <Route
            exact path='/login'
            render={() => 
              <Login
                userLoggedIn={this.userLoggedIn}
                persistLogin={this.persistLogin}
                refreshState={this.refreshState}
                setUser={this.setUser}
              />
            }
          />
          <Route exact path='/dashboard' render={( ) => <Dashboard user={this.state.user} /> } />
          <Route
            exact path='/settings'
            render={( ) => <Settings user={this.state.user} persistUser={this.setUser}/> } />
        </Switch>
      </div>
    );
  }
}

export default App;
