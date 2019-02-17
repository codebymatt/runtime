import React from 'react';
import LandingInfo from './LandingInfo';
import LoginPrompt from './LoginPrompt';
import SignupCard from './SignupCard';
import Axios from 'axios';

import './Landing.sass';

class Landing extends React.Component {
    render() {
      console.log("Printing base URL");
      console.log(Axios.defaults.base_url)
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