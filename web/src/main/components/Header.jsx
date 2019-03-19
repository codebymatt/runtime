import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Header.sass';

import NavBar from './NavBar';

const Header = props => {
  const { logUserOut } = props;
  return (
    <div>
      <div className="header-wrapper">
        <Link className="title-link" to="/">
          <h2>runtime</h2>
        </Link>
        <NavBar logUserOut={logUserOut} />
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  logUserOut: propTypes.func.isRequired,
};
