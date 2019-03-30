/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SignupCard from './SignupCard';
import './Signup.sass';
import SignupPrompt from './SignupPrompt';

class Signup extends Component {
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
      <div className="signup-container">
        <SignupCard
          persistUser={persistUser}
          persistLogin={persistLogin}
          userLoggedIn={userLoggedIn}
        />
        <SignupPrompt />
      </div>
    );
  }
}

export default withRouter(Signup);

Signup.propTypes = {
  refreshGlobalState: PropTypes.func.isRequired,
  persistUser: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.func.isRequired,
  persistLogin: PropTypes.func.isRequired,
  // es-lint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
