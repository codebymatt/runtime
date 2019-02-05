import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.sass';

import Header from './Header';

class Dashboard extends Component {
  render() {
    return(
      <div className='dashboard-wrapper'>
        <Header />
        <div className='dashboard-body'>
          <div className='notice-wrapper'>
            <div className='notice'>
              <p>Hey {this.props.user.first_name || 'friend'}!</p>
              <p>
                <b>runtime</b> is still in active development.
                <br />
                You can see your account info <Link to='/settings'>here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;