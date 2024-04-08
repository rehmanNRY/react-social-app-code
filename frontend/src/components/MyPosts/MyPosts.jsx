import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../RightBar/RightBar";
import Posts from "../Posts/Posts";
import userDetailApi from "../containers/functions/user/userDetailApi";

const MyPosts = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({})
  useEffect(() => {
    // Getting user detail
    const userDetail = async ()=>{
      const user = await userDetailApi();
      setUserData(user);
    }
    userDetail();

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
      <Posts postUserCheck={userData._id} heading={"My Posts"}/>
      <RightBar />
    </div>
    </>
  );
};

export default MyPosts;