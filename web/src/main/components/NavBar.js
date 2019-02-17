import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';

import './NavBar.sass';

import lineGraph from '../../icons/line-graph.svg';
import gear from '../../icons/gear.svg';
import logout from '../../icons/log-out.svg';

class NavBar extends Component {
  logout = () => {
    Axios.post("/v1/logout.json").then(() => {
      localStorage.removeItem('user');
      localStorage.setItem('loggedIn', 'false');
      this.props.history.push('/login');
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="header-link">
          <Link to="/dashboard"><img alt="" title="Dashboard" src={lineGraph}/></Link>
        </div>
        <div className="header-link">
          <Link to="/settings"><img alt="" title="Settings" src={gear}/></Link>
        </div>
        <div className="header-link">
          <Link onClick={ this.logout } to="/"><img alt="" title="Logout" src={logout}/></Link>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);