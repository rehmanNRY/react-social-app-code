import React, { useEffect, useState } from "react";
import getAllUsersApi from "../containers/functions/user/getAllUsersApi";
import './topbarProfile.css'

const TopbarProfiles = () => {
  // Other users list
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Getting alluser
    const getAllusers = async () => {
      const allUsers = await getAllUsersApi();
      setUsers(allUsers);
    };
    getAllusers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="topbarProfiles">
      {users.map((user) => (
        <div className="topbar_Profile">
          <div
          style={{ backgroundImage: `url(${user.profilePic})` }}
          key={user._id} ></div>
        </div>
      ))}
      {users.map((user) => (
        <div className="topbar_Profile">
          <div
          style={{ backgroundImage: `url(${user.profilePic})` }}
          key={user._id} ></div>
        </div>
      ))}
    </div>
  );
};

export default TopbarProfiles;
