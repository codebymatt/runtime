import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import './LoginCard.sass';
import SubmitButton from './SubmitButton';

class LoginCard extends Component {

  constructor(props) {
    super(props);

    this.state = { 'email': '', 'password': '' };
  }

  authenticateUser = (event) => {
    console.log("HITTING");
    event.preventDefault();
    const data = { 'credentials': { 'email': this.state.email, 'password': this.state.password } };
    axios.post('http://localhost:3000/v1/login.json', data, { withCredentials: true, origin: 'localhost:3000' }).then((response) => {
      console.log(response)
      this.props.history.push('/dashboard');
    }).catch((error) => {
      console.log(error);
    })
  }

  handleEmailChange = (event) => {
    this.setState({ 'email': event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ 'password': event.target.value })
  }

  render() {
    return(
      <div className='login-card-wrapper'>
        <form className='login-form'>
          <input
            className='long-input'
            type='email'
            name='email'
            value={ this.state.email }
            onChange={ this.handleEmailChange }
            placeholder='Email'
          />
          <input
            className='long-input'
            type='password'
            name='password'
            value={ this.state.password }
            onChange={ this.handlePasswordChange }
            placeholder='Password'
          />
          <SubmitButton
            onPress={this.authenticateUser}
            className='submit-button'
            text='Login'
          />
        </form>
      </div>
    );
  }
}

export default withRouter(LoginCard);