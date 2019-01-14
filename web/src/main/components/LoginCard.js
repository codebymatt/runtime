import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import './LoginCard.sass';
import SubmitButton from './SubmitButton';

class LoginCard extends Component {

  constructor(props) {
    super(props);

    this.state = { "email": "", "password": "" };
  }

  authenticateUser = () => {
    const data = { "credentials": { "email": this.state.email, "password": this.state.password } }
    axios.post("http://localhost:3000/v1/login.json", data).then((response) => {
      console.log(response);
      this.props.history.push('/dashboard');
    }).catch((error) => {
      console.log(error);
    })
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