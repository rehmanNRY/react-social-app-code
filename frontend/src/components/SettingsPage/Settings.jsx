import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";
import './Settings.css'

const Settings = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.authToken) {
      const path = "/auth";
      navigate(path);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
    <TopBar />
      <LeftBar />
      <div className="settings_main">
        <div className="settings_data">
          <Link to='/set-profile-pic'>
            <h3>Update Profile photo</h3>
            <p>Change your profile picture with a new one.</p>
            <h5>Learn more →</h5>
            <img src="https://toastlog.com/img/logos/csspro.png" alt="" />
          </Link>
          <Link to='/bookmarks'>
            <h3>Bookmarks</h3>
            <p>Posts you have bookmarked to see later.</p>
            <h5>Learn more →</h5>
            <img src="https://csspro.com/svg-to-background-image-css/square.jpg" alt="" />
          </Link>
          <Link to='/friends'>
            <h3>Friends ally</h3>
            <p>See your friends and share memories with them.</p>
            <h5>Learn more →</h5>
            <img src="https://toastlog.com/img/logos/logo.svg" alt="" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Settings;