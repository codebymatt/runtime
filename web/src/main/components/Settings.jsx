/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import Header from './Header';
import SubmitButton from './SubmitButton';
import './Settings.sass';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmingDeletion: false,
      user: { ...props.originalUser },
    };
  }

  componentDidUpdate = prevProps => {
    const { originalUser } = this.props;
    if (prevProps.originalUser !== originalUser) {
      this.setState({
        user: { ...originalUser },
      });
    }
  };

  updateUserField = event => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    console.log(user);
    this.setState({ user });
  };

  setUpdatedUser = updatedUser => {
    const { persistUser } = this.props;
    persistUser(updatedUser);
  };

  constructUserInApiFormat = () => {
    const { user } = this.state;
    return {
      user: {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
      },
    };
  };

  constructUserInClientFormat = apiUser => {
    return {
      email: apiUser.email,
      firstName: apiUser.first_name,
      lastName: apiUser.last_name,
    };
  };

  updateUser = event => {
    event.preventDefault();
    const { originalUser } = this.props;
    const data = this.constructUserInApiFormat();
    Axios.put('/v1/user.json', data)
      .then(response => {
        this.setUpdatedUser(this.constructUserInClientFormat(response.data.user));
      })
      .catch(error => {
        this.setState({ user: originalUser });
        console.log(error);
      });
  };

  deleteAccount = () => {
    const { history } = this.props;
    Axios.delete('/v1/user.json')
      .then(() => {
        localStorage.clear();
        history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  toggleDeletionConfirmation = () => {
    const { confirmingDeletion } = this.state;
    this.setState({ confirmingDeletion: !confirmingDeletion });
  };

  showDeleteConfirmationPrompt = () => {
    const { confirmingDeletion } = this.state;
    if (confirmingDeletion) {
      return (
        <div className="deletion-check">
          Are you sure you want to delete your account?
          <br />
          It'll be gone forever!
        </div>
      );
    }
    return null;
  };

  chooseButtonDisplay = () => {
    const { confirmingDeletion } = this.state;
    if (confirmingDeletion) {
      return (
        <div className="button-wrapper">
          <div
            role="button"
            tabIndex={0}
            onClick={this.deleteAccount}
            className="basic-button confirm-deletion"
            text="Update"
          >
            Confirm
          </div>
          <div
            role="button"
            tabIndex={0}
            className="basic-button delete-button"
            onClick={this.toggleDeletionConfirmation}
          >
            {' '}
            Cancel{' '}
          </div>
        </div>
      );
    }
    return (
      <div className="button-wrapper">
        <SubmitButton
          role="button"
          tabIndex={0}
          onPress={this.updateUser}
          className="submit-button"
          text="Update"
        />
        <div
          role="button"
          tabIndex={0}
          className="basic-button delete-button"
          onClick={this.toggleDeletionConfirmation}
        >
          Delete
        </div>
      </div>
    );
  };

  render() {
    const { user } = this.state;
    return (
      <div className="settings-wrapper">
        <Header />
        <div className="settings-body">
          <h1>Your Settings</h1>
          <div className="update-user-card">
            <form className="update-user-form">
              <div className="input-wrapper">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={this.updateUserField}
                />
              </div>
              <div className="input-wrapper">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={this.updateUserField}
                />
              </div>
              <div className="input-wrapper">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={this.updateUserField}
                />
              </div>
              {this.chooseButtonDisplay()}
            </form>
          </div>
          {this.showDeleteConfirmationPrompt()}
        </div>
      </div>
    );
  }
}

export default withRouter(Settings);

Settings.propTypes = {
  originalUser: propTypes.shape({
    email: propTypes.string.isRequired,
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string,
  }).isRequired,
  persistUser: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
};
