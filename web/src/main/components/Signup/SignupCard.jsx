import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import SubmitButton from '../SubmitButton';
import './SignupCard.sass';

class SignupCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  composeUserData = () => {
    const { email, firstName, lastName, password, passwordConfirmation } = this.state;
    return {
      user: {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirmation: passwordConfirmation,
      },
    };
  };

  signUp = event => {
    event.preventDefault();
    const data = this.composeUserData();
    const { setUser, history } = this.props;
    Axios.post('/v1/user.json', data)
      .then(response => {
        setUser(this.constructUserObject(response.data.user));
        history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
  };

  constructUserObject = apiUser => {
    return {
      firstName: apiUser.first_name,
      lastName: apiUser.last_name,
      email: apiUser.email,
    };
  };

  updateUserData = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="signup-wrapper">
        <form className="signup-form">
          <div className="name-wrapper">
            <input name="firstName" placeholder="First Name" onChange={this.updateUserData} />
            <input name="lastName" placeholder="Last Name" onChange={this.updateUserData} />
          </div>
          <input
            className="long-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.updateUserData}
          />
          <input
            className="long-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.updateUserData}
          />
          <input
            className="long-input"
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            onChange={this.updateUserData}
          />
          <SubmitButton onPress={this.signUp} text="Sign Up" />
        </form>
      </div>
    );
  }
}

export default withRouter(SignupCard);

SignupCard.propTypes = {
  setUser: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
};
