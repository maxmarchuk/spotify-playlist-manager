import React from "react";
import "./UserHeader.css";

const UserHeader = props => {
  const { loggedIn } = props;

  return (
    <a className="login-link" href="http://localhost:8888">
      Login to Spotify
    </a>
  );
};

export default UserHeader;
