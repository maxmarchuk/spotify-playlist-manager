import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavMenu = () => {
  return (
    <ul className="nav-menu">
      <li>
        <Link to="/">
          <FontAwesomeIcon icon="home" />
        </Link>
      </li>
      <li>
        <Link to="/">Playlists</Link>
      </li>
    </ul>
  );
};

export default NavMenu;
