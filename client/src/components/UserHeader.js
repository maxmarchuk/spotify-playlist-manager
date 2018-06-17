import React from 'react';
import '../styles/UserHeader.css';

const NavItem = ({ children }) => <li className="nav-item">{children}</li>;
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
  const { user, logUserOut } = props;
  if (!user) {
    return null;
  }

  return (
    <div className="user-header">
      <ul className="nav-menu">
        <NavItem>
          <i className="fas fa-home" />
        </NavItem>
        <NavItem>Playlists</NavItem>
      </ul>
      <UserInfo user={user} logUserOut={logUserOut} />
    </div>
  );
};

export default UserHeader;
