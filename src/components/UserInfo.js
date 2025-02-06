// UserInfo.js
import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <h2>Welcome, {user.name}</h2>
      <img src={user.imageUrl} alt={user.name} className="profile-img" />
      <p>Email: {user.email}</p>
      <p>Google ID: {user.googleId}</p>
      <p>Given Name: {user.givenName}</p>
    </div>
  );
};

export default UserInfo;
