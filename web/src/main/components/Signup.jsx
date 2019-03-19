import React from 'react';
import { withRouter } from 'react-router-dom';

import SignupCard from './SignupCard';
import './Signup.sass';

const Signup = () => {
  return (
    <div className="signup-container">
      <SignupCard />
    </div>
  );
};

export default withRouter(Signup);
