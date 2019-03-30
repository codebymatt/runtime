/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';

import './LoginPrompt.sass';

const LoginPrompt = () => {
  // TODO: REFACTOR LOGIN/SIGNUP PROMPTS TO USE SAME COMPONENT STRUCTURE
  return (
    <div className="signup-prompt">
      <p>Don't have an account yet?</p>
      <p>
        <Link to="/signup">Sign up here</Link>
      </p>
      <p className="landing-link">
        <Link to="/">Back to landing</Link>
      </p>
    </div>
  );
};

export default LoginPrompt;
