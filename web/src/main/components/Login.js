import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './Login.sass';

import LandingInfo from './LandingInfo';
import SignupPrompt from './SignupPrompt';
import LoginCard from './LoginCard';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.refreshState();
  }

  componentDidMount() {
    if (this.props.userLoggedIn()) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
      return(
          <div className='login-wrapper'>
              <LandingInfo />
              <LoginCard setUser={this.props.setUser} persistLogin={this.props.persistLogin} />
              <SignupPrompt/>
          </div>
      );
  }
}

export default withRouter(Login);