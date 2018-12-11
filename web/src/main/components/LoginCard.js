import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './LoginCard.sass';
import SubmitButton from './SubmitButton';

class LoginCard extends Component {
    authenticateUser = () => {
        this.props.history.push('/dashboard');
    };

    render() {
        return(
            <div className='login-card-wrapper'>
                <form className='login-form'>
                    <input
                        className='long-input'
                        type='email'
                        name='email'
                        placeholder='Email'
                    />
                    <input
                        className='long-input'
                        type='password'
                        name='password'
                        placeholder='Password'
                    />
                    <SubmitButton
                        onPress={this.authenticateUser}
                        className='submit-button'
                        text="Login"
                    />
                </form>
            </div>
        );
    }
}

export default withRouter(LoginCard);