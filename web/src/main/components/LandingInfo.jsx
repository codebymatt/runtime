import React from 'react';

import './LandingInfo.sass';

const LandingInfo = () => {
  return (
    <div className="landing-header">
      <div className="logo-wrapper">runtime</div>
      <div className="nav-wrapper">
        <div className="nav-item about-wrapper">
          <p>About</p>
        </div>
        <div className="nav-item">
          <p>Login</p>
        </div>
        <div className="nav-item rt-button nav-button sign-up-button">Sign Up</div>
      </div>
    </div>
  );
};

export default LandingInfo;
