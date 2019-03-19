import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.sass';

import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Settings from './components/Settings';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')) || {},
      loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || false,
    };
  }

  persistUser = userObject => {
    this.setPersistentState('user', userObject);
  };

  refreshState = () => {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')) || {},
      loggedIn: this.userLoggedIn(),
    });
  };

  userLoggedIn = () => {
    const { loggedIn } = this.state;
    return JSON.parse(loggedIn) || false;
  };

  logUserOut = () => {
    localStorage.removeItem('user');
    localStorage.setItem('loggedIn', 'false');
    this.setState({ loggedIn: false });
  };

  persistLogin = () => {
    this.setPersistentState('loggedIn', true);
  };

  setPersistentState = (key, val) => {
    this.setState({ [key]: val }, () => {
      localStorage.setItem(key, JSON.stringify(val));
    });
  };

  // updateUser = user => {
  //   this.setState({ user });
  //   this.persistUser(user);
  // };

  // updateUserField = event => {
  //   const { user } = this.state;
  //   user[event.target.name] = event.target.value;
  //   this.setState({ user });
  // };

  render() {
    const { user } = this.state;
    return (
      <div className="app-container">
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Landing persistUser={this.persistUser} logUserOut={this.logUserOut} />}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                userLoggedIn={this.userLoggedIn}
                persistLogin={this.persistLogin}
                refreshState={this.refreshState}
                persistUser={this.persistUser}
              />
            )}
          />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route
            exact
            path="/dashboard"
            render={() => <Dashboard user={user} logUserOut={this.logUserOut} />}
          />
          <Route
            exact
            path="/settings"
            render={() => (
              <Settings
                originalUser={user}
                persistUser={this.persistUser}
                updateUser={this.updateUser}
                logUserOut={this.logUserOut}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
