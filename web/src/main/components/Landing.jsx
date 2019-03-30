import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './Landing.sass';
import LandingGraphic from '../../images/runtime-landing.png';

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <div className="landing-header">
        <div className="logo-wrapper">runtime</div>
        <div className="nav-wrapper">
          <div className="nav-item about-wrapper">
            <p>About</p>
          </div>
          <div className="nav-item">
            <Link to="/login">
              <p>Login</p>
            </Link>
          </div>
          <Link to="/signup">
            <div className="nav-item rt-button nav-button sign-up-button">Sign Up</div>
          </Link>
        </div>
      </div>
      <div className="landing-graphic">
        <img src={LandingGraphic} alt="" />
      </div>
      <div className="landing-kicker">
        Run, track your times, <br />
        then visualise them.
      </div>
      <div className="sign-up-wrapper">
        <p className="cta">Create an account for free!</p>
        <Link to="/signup">
          <div className="rt-button sign-up-button">Sign Up</div>
        </Link>
      </div>
      <div className="landing-footer">
        <div className="inner-wrapper">
          <div className="my-kicker">
            created with care by <a href="https://mattcraig.me">Matt Craig</a>
          </div>
          <div className="social-wrapper">
            <a href="https://github.com/codebymatt/runtime">
              <i className="fab fa-github" />
            </a>
            <a href="mailto:contact@mattcraig.me">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Landing);
