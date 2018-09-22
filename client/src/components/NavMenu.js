import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
  return (
    <ul className="nav-menu">
      <li className="nav-item">
        <Link to="/">
          <i className="fas fa-home" />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/">Playlists</Link>
      </li>
    </ul>
  );
};

export default NavMenu;