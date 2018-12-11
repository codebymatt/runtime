import React, { Component } from 'react';

import SubmitButton from './SubmitButton.js';
import './SignupCard.sass';

class SignupCard extends Component {
    signUp = () => {
        console.log('Signing up...')
    }

    render() {
        return(
            <div className='signup-wrapper'>
                <form className='signup-form'>
                    <div className='name-wrapper'>
                        <input name='firstName' placeholder='First Name'/>
                        <input name='lastName' placeholder='Last Name'/>
                    </div>
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
                    <input
                        className='name-wrapper'
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                    />
                    <SubmitButton
                        onPress={this.signUp}
                        className='submit-button'
                        text="Sign Up"
                    />
                </form>
            </div>
        );
    }
}

export default SignupCard;