import React from 'react';
import '../styles/UserHeader.css';
import NowPlaying from './NowPlaying';
import UserInfo from './UserInfo';
import NavMenu from './NavMenu';

const UserHeader = props => {
  const { logUserOut } = props;
  const user = JSON.parse(window.sessionStorage.getItem('user'));

  if (!user) {
    return null;
  }

  return (
    <header className="user-header">
      <NavMenu />
      <NowPlaying />
      <UserInfo user={user} logUserOut={logUserOut} />
    </header>
  );
};

export default UserHeader;
