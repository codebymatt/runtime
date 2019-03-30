import React from 'react';
import { Link } from 'react-router-dom';

import './SignupPrompt.sass';

const SignupPrompt = () => {
  return (
    <div className="login-prompt">
      <p>Already have an account?</p>
      <p>
        <Link to="/login">Login here</Link>
      </p>
      <p className="landing-link">
        <Link to="/">Back to landing</Link>
      </p>
    </div>
  );
};

export default SignupPrompt;
