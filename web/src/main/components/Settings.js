import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

import './Settings.sass';

class Settings extends Component {
  render() {
    return(
      <div className="settings-wrapper">
        <Header />
        <div className="settings-body">
          <div className="notice-wrapper">
            <div className="notice">
              <p>Hey { this.props.user.first_name || 'friend' }!</p>
              <p>
                <b>runtime</b> is still in active development.<br/>
                You can see your dashboard <Link to="/dashboard">here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;