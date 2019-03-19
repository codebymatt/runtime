import React, { Component } from 'react';
import Axios from 'axios';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './LoginCard.sass';
import SubmitButton from './SubmitButton';

class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    const { userLoggedIn, history } = this.props;
    if (userLoggedIn()) {
      history.push('/dashboard');
    }
  }

  authenticateUser = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { persistLogin, persistUser, history } = this.props;
    const data = { credentials: { email, password } };
    Axios.post('/v1/login.json', data)
      .then(response => {
        persistLogin();
        persistUser(this.constructUserObject(response.data.user));
        history.push('/dashboard');
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
    const { email, password } = this.state;
    return (
      <div className="login-card-wrapper">
        <form className="login-form">
          <input
            className="long-input"
            type="email"
            name="email"
            value={email}
            onChange={this.handleEmailChange}
            placeholder="Email"
          />
          <input
            className="long-input"
            type="password"
            name="password"
            value={password}
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

LoginCard.propTypes = {
  userLoggedIn: propTypes.func.isRequired,
  persistLogin: propTypes.func.isRequired,
  persistUser: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
};
