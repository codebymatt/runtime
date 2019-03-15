import React, { Component } from 'react';
import { withRouter } from 'react-router';

import SignupCard from './SignupCard';
import './Signup.sass'

class Signup extends Component {
  render() {
    return(
      <div className='signup-container'>
        <SignupCard />
      </div>
    );
  }
}

export default withRouter(Signup);