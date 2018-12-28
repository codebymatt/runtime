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
                    <img alt="Dashboard" src={lineGraph}/>
                </div>
                <div className="header-link">
                    <img alt="Settings" src={gear}/>
                </div>
            </div>
        );
    }
}

export default NavBar;