import React from 'react';
import { Link } from 'react-router-dom';

import './Header.sass';

import NavBar from './NavBar';

const Header = () => {
  return (
    <div>
      <div className="header-wrapper">
        <Link className="title-link" to="/">
          <h2>runtime</h2>
        </Link>
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
