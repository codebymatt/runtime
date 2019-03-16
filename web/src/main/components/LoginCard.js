import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import './LoginCard.sass';
import SubmitButton from './SubmitButton';

class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    if (this.props.userLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  authenticateUser = event => {
    event.preventDefault();
    const data = { credentials: { email: this.state.email, password: this.state.password } };
    axios
      .post('/v1/login.json', data)
      .then(response => {
        this.props.persistLogin();
        this.props.setUser(this.constructUserObject(response.data.user));
        this.props.history.push('/dashboard');
      })
      .catch(error => {
        console.log(error);
      });
  };

  constructUserObject = apiUser => {
    return {
      firstName: apiUser.first_name,
      lastName: apiUser.last_name,
      email: apiUser.email,
    };
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="login-card-wrapper">
        <form className="login-form">
          <input
            className="long-input"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            placeholder="Email"
          />
          <input
            className="long-input"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            placeholder="Password"
          />
          <div className="submit-wrapper">
            <SubmitButton onPress={this.authenticateUser} className="submit-button" text="Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginCard);
