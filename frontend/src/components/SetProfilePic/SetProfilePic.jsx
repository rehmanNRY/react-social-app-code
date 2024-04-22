import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePic.css";
import { X, PlusSquare } from "react-feather";
import userDetailApi from "../containers/functions/user/userDetailApi";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";

const SetProfilePic = () => {
  const [userData, setUserData] = useState([]);
  const [pictureLink, setPictureLink] = useState("");
  const [newPath, setNewPath] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.authToken) {
      const path = "/auth";
      navigate(path);
    }

    // Getting user detail
    const getUserDetail = async () => {
      try {
        const user = await userDetailApi();
        setUserData(user);
        setPictureLink(user.profilePic);
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
    };

    getUserDetail();

    if (newPath !== "") {
      window.history.replaceState(null, "", newPath);
      navigate(newPath);
    }
  }, [navigate, newPath]);

  // Handle Change
  const handleInputChange = (event) => {
    setPictureLink(event.target.value);
  };

  // Api call for Updating profile pic
  const updateProfilePic = async (profilePic) => {
    try {
      // Api call
      const host = "http://localhost:5000";
      const url = `${host}/api/auth/updateProfilePic`;
      const auth_token = localStorage.authToken;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token,
        },
        body: JSON.stringify({ profilePic }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log("Some error occured");
    }
  };

  //  Navigate to home
  const navigatetoHome = () => {
    setNewPath("/home");
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Api call
    await updateProfilePic(pictureLink);
    navigatetoHome();
  };

  return (
    <>
      <TopBar />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <LeftBar />
        <div className="setProfilePic">
          <div className="setProfile_main">
            <button
              type="button"
              onClick={navigatetoHome}
              className="setProfile_clsBtn"
            >
              <X />
            </button>
            <div className="setprofileTop">
              <div className="oldPic">
                <div style={{ backgroundImage: `url(${pictureLink})` }}></div>
              </div>
              <div className="setProfile_text">
                <h3>Update Profile Pic</h3>
                <h4>Hey, {userData.name}</h4>
              </div>
            </div>
            <div className="setProfile_form">
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={pictureLink}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder="Enter Picture link"
                />
                <button type="submit">
                  <PlusSquare />
                  Update Dp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetProfilePic;
