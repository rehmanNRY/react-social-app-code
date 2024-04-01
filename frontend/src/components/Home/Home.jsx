import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";
// import RightBar from "../RightBar/RightBar";
// import Posts from "../Posts/Posts";
import UserProfile from "../UserProfile/UserProfile";

const Home = () => {
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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <LeftBar />
      <UserProfile/>
      {/* <Posts /> */}
      {/* <RightBar /> */}
    </div>
    </>
  );
};

export default Home;
