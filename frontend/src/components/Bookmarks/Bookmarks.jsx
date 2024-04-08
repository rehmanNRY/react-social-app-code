import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../RightBar/RightBar";
import Posts from "../Posts/Posts";
import bookmarkListApi from "../containers/functions/bookmark/bookmarkListApi";
// import userDetailApi from "../containers/functions/user/userDetailApi";

const Bookmarks = () => {
  const navigate = useNavigate();
  const [bookmarkList, setbookmarkList] = useState([])
  useEffect(() => {
    // Getting user detail
    const bookmarkedPosts = async ()=>{
      const bookmarksList = await bookmarkListApi();
      setbookmarkList(bookmarksList);
      // console.log(bookmarksList)
    }
    bookmarkedPosts();

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
      <Posts 
        postUserCheck={false} 
        heading={"Your Bookmarked Posts"} 
        checkBookmark={true} 
      />
      <RightBar />
    </div>
    </>
  );
};

export default Bookmarks;