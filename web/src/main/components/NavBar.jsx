import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import propTypes from 'prop-types';

import './NavBar.sass';

import lineGraph from '../../icons/line-graph.svg';
import gear from '../../icons/gear.svg';
import logout from '../../icons/log-out.svg';

class NavBar extends Component {
  logout = () => {
    const { logUserOut, history } = this.props;
    Axios.post('/v1/logout.json')
      .then(() => {
        logUserOut();
        history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="nav-wrapper">
        <div className="header-link">
          <Link to="/dashboard">
            <img alt="" title="Dashboard" src={lineGraph} />
          </Link>
        </div>
        <div className="header-link">
          <Link to="/settings">
            <img alt="" title="Settings" src={gear} />
          </Link>
        </div>
        <div className="header-link">
          <Link onClick={this.logout} to="/">
            <img alt="" title="Logout" src={logout} />
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);

NavBar.propTypes = {
  logUserOut: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
};
