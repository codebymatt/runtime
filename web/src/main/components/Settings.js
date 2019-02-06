import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Header from './Header';

import SubmitButton from './SubmitButton.js';
import './Settings.sass';
import Axios from 'axios';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userReference: this.props.user,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email
     }
  }

  updateUserData = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  setUpdatedUser = (user) => {
    this.props.persistUser(user);
    this.setState({
      userReference: user,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  }

  constructUserInApiFormat = () => {
    return {
      user: {
        email: this.state.email,
        first_name: this.state.firstName,
        last_name: this.state.lastName
      }
    }
  }

  constructUserInClientFormat = (apiUser) => {
    return {
      email: apiUser.email,
      firstName: apiUser.first_name,
      lastName: apiUser.last_name
    }
  }

  updateUser = (event) => {
    event.preventDefault();
    const data = this.constructUserInApiFormat();
    Axios.put('/v1/user.json', data).then((response) => {
      this.setUpdatedUser(this.constructUserInClientFormat(response.data.user));
    }).catch((error) => {
      this.setUpdatedUser(this.state.userReference);
      console.log(error);
    });
  }

  render() {
    return(
      <div className='settings-wrapper'>
        <Header />
        <div className='settings-body'>
          <div className='notice-wrapper'>
            <div className='notice'>
              <p>Hey { this.props.user.firstName || 'friend' }!</p>
              <p>
                <b>runtime</b> is still in active development,<br/>
                and is still a little rough around the edges.
              </p>
            </div>
          </div>
          <h1>Your Settings</h1>
          <form className='update-user-form'>
            <div className='input-wrapper'>
              <label>First Name</label>
              <input
                type='text'
                name='firstName'
                value={ this.state.firstName || '' }
                onChange={ this.updateUserData }
              />
            </div>
            <div className='input-wrapper'>
            <label>Last Name</label>
              <input
                type='text'
                name='lastName'
                value={ this.state.lastName || '' }
                onChange={ this.updateUserData }
              />
            </div>
            <div className='input-wrapper'>
              <label>Email</label>
              <input
                type='text'
                name='email'
                value={ this.state.email || '' }
                onChange={ this.updateUserData }
              />
            </div>
            <SubmitButton
              onPress={this.updateUser}
              className='submit-button'
              text='Update'
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;