import React from 'react';
import './UserInfo.css';

const UserInfo = props => {
  const { user, logUserOut } = props;

  return (
    <div className="user-info">
      <img className="user-thumbnail" src={user.images[0].url} alt="User" />
      <p className="user-name">{user.display_name}</p>
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

export default UserInfo;
