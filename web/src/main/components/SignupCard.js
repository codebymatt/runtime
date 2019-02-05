import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SubmitButton from './SubmitButton.js';
import './SignupCard.sass';
import Axios from 'axios';

class SignupCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        password_confirmation: ""
      }
    }

    composeUserData() {
    return {
      user: {
        email: this.state.email,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    }
  }

  signUp = (event) => {
    event.preventDefault();
    const data = this.composeUserData();
    Axios.post('/v1/user.json', data).then((response) => {
      this.props.setUser(response.data.user);
      this.props.history.push('/dashboard');
    }).catch((err) => {
      console.log(err);
    });
  }


  updateUserData = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return(
      <div className='signup-wrapper'>
        <form className='signup-form'>
          <div className='name-wrapper'>
            <input name='firstName' placeholder='First Name' onChange={ this.updateUserData }/>
            <input name='lastName' placeholder='Last Name' onChange={ this.updateUserData }/>
          </div>
          <input
            className='long-input'
            type='email'
            name='email'
            placeholder='Email'
            onChange={ this.updateUserData }
          />
          <input
            className='long-input'
            type='password'
            name='password'
            placeholder='Password'
            onChange={ this.updateUserData }
          />
          <input
            className='name-wrapper'
            type='password'
            name='passwordConfirmation'
            placeholder='Confirm Password'
            onChange={ this.updateUserData }
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

export default withRouter(SignupCard);