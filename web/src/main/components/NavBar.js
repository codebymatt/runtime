import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.sass';

import lineGraph from '../../icons/line-graph.svg';
import gear from '../../icons/gear.svg';

class NavBar extends Component {
    render() {
        return (
            <div className="nav-wrapper">
                <div className="header-link current-page">
                    <Link to="/dashboard"><img alt="" src={lineGraph}/></Link>
                </div>
                <div className="header-link">
                    <Link to="/settings"><img alt="" src={gear}/></Link>
                </div>
            </div>
        );
    }
}

export default NavBar;