/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Login.sass';

import LoginCard from './LoginCard';
import LoginPrompt from './LoginPrompt';

class Login extends Component {
  componentDidMount() {
    const { userLoggedIn, refreshGlobalState, history } = this.props;
    refreshGlobalState();
    if (userLoggedIn()) {
      history.push('/dashboard');
    }
  }

  render() {
    const { persistUser, persistLogin, userLoggedIn } = this.props;
    return (
      <div className="login-wrapper">
        <LoginCard
          persistUser={persistUser}
          persistLogin={persistLogin}
          userLoggedIn={userLoggedIn}
        />
        <LoginPrompt />
      </div>
    );
  }
}

export default withRouter(Login);

Login.propTypes = {
  refreshGlobalState: PropTypes.func.isRequired,
  persistUser: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.func.isRequired,
  persistLogin: PropTypes.func.isRequired,
  // es-lint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
