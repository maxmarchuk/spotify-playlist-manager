import React from 'react';
import '../styles/UserHeader.css';
import { Link } from 'react-router-dom';

const UserInfo = props => {
  const { user, logUserOut } = props;

  return (
    <div className="user-info">
      <img className="user-thumbnail" src={user.images[0].url} alt="User" />
      {user.display_name}
      <a
        href="http://localhost:8888"
        className="user-log-out"
        onClick={() => logUserOut()}
      >
        Log out
      </a>
    </div>
  );
};
const UserHeader = props => {
  const { logUserOut } = props;
  const user = JSON.parse(window.sessionStorage.getItem('user'));

  if (!user) {
    return null;
  }

  return (
    <div className="user-header">
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
      <UserInfo user={user} logUserOut={logUserOut} />
    </div>
  );
};

export default UserHeader;
