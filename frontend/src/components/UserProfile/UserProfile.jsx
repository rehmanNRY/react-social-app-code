import "./Profile.css";
import Profile from "./Profile";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";
import userDetailUsingId from "../containers/functions/user/userDetailUsingId";

const UserProfile = () => {
  // Use the useParams hook to get the parameters from the URL
  const { userId } = useParams();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    // Getting user Data using Id
    const getUserDetail = async () => {
      const user = await userDetailUsingId(userId);
      setUserData(user);
    };
    getUserDetail();

    // Navigating if not login
    if (!localStorage.authToken) {
      const path = "/auth";
      navigate(path);
    }
  }, [userId, navigate]); // Add userId as a dependency
  
  return (
    <>
      <TopBar />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <LeftBar />
        <div className="UserProfile_main">
          {/* Pass user data as a prop */}
          <Profile user={userData} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;