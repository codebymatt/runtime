import React from 'react';
import propTypes from 'prop-types';

import './Dashboard.sass';

import Header from '../Header';
import RunList from './RunList';
import Metrics from './Metrics';

const Dashboard = props => {
  const { logUserOut } = props;
  return (
    <div className="dashboard-wrapper">
      <Header logUserOut={logUserOut} />
      <div className="dashboard-body">
        <RunList />
        <Metrics />
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
