import React, { Component } from 'react';

import './Header.sass'

import NavBar from './NavBar';

class Header extends Component {
    render() {
        return(
            <div>
                <div className='header-wrapper'>
                    <h2>runtime</h2>
                    <NavBar/>
                </div>
            </div>
        );
    }
}

export default Header;