import React, { Component } from 'react';
import './SignupCard.sass';

class SignupCard extends Component {
    render() {
        return(
            <div className='signup-wrapper'>
                <form class='signup-form'>
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
                    <button type='submit' className='signup-button'>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignupCard;