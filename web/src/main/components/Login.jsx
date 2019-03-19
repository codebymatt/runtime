import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Login.sass';

import LandingInfo from './LandingInfo';
import SignupPrompt from './SignupPrompt';
import LoginCard from './LoginCard';

class Login extends Component {
  componentDidMount() {
    const { userLoggedIn, refreshState, history } = this.props;
    refreshState();
    if (userLoggedIn()) {
      history.push('/dashboard');
    }
  }

  render() {
    const { persistUser, persistLogin, userLoggedIn } = this.props;
    return (
      <div className="login-wrapper">
        <LandingInfo />
        <LoginCard
          persistUser={persistUser}
          persistLogin={persistLogin}
          userLoggedIn={userLoggedIn}
        />
        <SignupPrompt />
      </div>
    );
  }
}

export default withRouter(Login);

Login.propTypes = {
  refreshState: PropTypes.func.isRequired,
  persistUser: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.func.isRequired,
  persistLogin: PropTypes.func.isRequired,
  // es-lint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
