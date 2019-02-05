import React from 'react';
import LandingInfo from './LandingInfo';
import LoginPrompt from './LoginPrompt';
import SignupCard from './SignupCard';

import './Landing.sass';

class Landing extends React.Component {
    render() {
      return (
        <div className='landing-wrapper'>
          <LandingInfo />
          <SignupCard setUser={ this.props.setUser } />
          <LoginPrompt />
        </div>
      );
    }
}

export default Landing;