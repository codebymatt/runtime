import React from 'react';
import LandingInfo from './LandingInfo';
import LoginPrompt from './LoginPrompt';
import SignupCard from './SignupCard';

import './Landing.sass';

class Landing extends React.Component {
    render() {
      console.log("Printing RUNTIME_ENV");
      console.log(process.env.RUNTIME_ENV)
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