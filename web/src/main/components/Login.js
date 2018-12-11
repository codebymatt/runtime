import React, { Component } from 'react';

import './Login.sass';

import LandingInfo from './LandingInfo';
import SignupPrompt from './SignupPrompt';
import LoginCard from './LoginCard';

class Login extends Component {
    render() {
        return(
            <div className='login-wrapper'>
                <LandingInfo />
                <LoginCard/>
                <SignupPrompt/>
            </div>
        );
    }
}

export default Login;