import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Dashboard.sass';

import Header from './Header';

const Dashboard = props => {
  const { user, logUserOut } = props;
  return (
    <div className="dashboard-wrapper">
      <Header logUserOut={logUserOut} />
      <div className="dashboard-body">
        <div className="notice-wrapper">
          <div className="notice">
            <p>Hey {user.firstName || 'friend'}!</p>
            <p>
              <b>runtime</b> is still in active development.
              <br />
              You can see your account info <Link to="/settings">here</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  user: propTypes.shape({
    firstName: propTypes.string,
    lastName: propTypes.string,
    email: propTypes.string,
  }).isRequired,
  logUserOut: propTypes.func.isRequired,
};
