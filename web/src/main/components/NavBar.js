import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.sass';

import lineGraph from '../../icons/line-graph.svg';
import gear from '../../icons/gear.svg';
import logout from '../../icons/log-out.svg';

class NavBar extends Component {
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
          <Link to="/"><img alt="" title="Logout" src={logout}/></Link>
        </div>
      </div>
    );
  }
}

export default NavBar;