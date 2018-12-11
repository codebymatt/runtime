import React, { Component } from 'react';
import './LoginCard.sass';

class LoginCard extends Component {
    render() {
        return(
            <div className='login-card-wrapper'>
                <form class='login-form'>
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
                    <button type='submit' className='login-button'>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginCard;