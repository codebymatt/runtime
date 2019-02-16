import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';

import SubmitButton from './SubmitButton.js';
import './Settings.sass';
import Axios from 'axios';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmingDeletion: false,
      userReference: this.props.user,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email
     }
  }

  render() {
    return(
      <div className='settings-wrapper'>
        <Header />
        <div className='settings-body'>
          <h1>Your Settings</h1>
          <div className='update-user-card'>
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
              {this.chooseButtonDisplay()}
            </form>
          </div>
        </div>
      </div>
    );
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

  deleteAccount = () => {
    Axios.delete('/v1/user.json').then((response) => {
      localStorage.clear();
      this.props.history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  }

  toggleDeletionConfirmation = () => {
    if (this.state.confirmingDeletion) {
      this.setState({confirmingDeletion: false})
    } else {
      this.setState({confirmingDeletion: true})
    }
  }

  chooseButtonDisplay = () => {
    if (this.state.confirmingDeletion) {
      return(
        <div className='button-wrapper'>
          <div
            onClick={this.deleteAccount}
            className='basic-button confirm-deletion'
            text='Update'
          >
            Delete
          </div>
          <div
            className="basic-button delete-button"
            onClick={ this.toggleDeletionConfirmation }
          >
            Cancel
          </div>
        </div>
      );
    } else {
      return (
        <div className='button-wrapper'>
          <SubmitButton
            onPress={this.updateUser}
            className='submit-button'
            text='Update'
          />
          <div
            className="basic-button delete-button"
            onClick={ this.toggleDeletionConfirmation }
          >
            Delete
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Settings);