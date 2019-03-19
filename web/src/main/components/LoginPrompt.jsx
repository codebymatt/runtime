import React from 'react';
import { Link } from 'react-router-dom';

import './LoginPrompt.sass';

const LoginPrompt = () => {
  return (
    <div className="login-prompt">
      <p>Already have an account?</p>
      <p>
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default LoginPrompt;
