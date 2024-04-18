import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../RightBar/RightBar";
import '../People/People.css'
import { fetchFriendList } from "../containers/functions/FriendRequests/FriendRequests";
import getAllUsersApi from "../containers/functions/user/getAllUsersApi";

const FriendList = () => {
  const [reqIds, setReqIds] = useState([])
  const [users, setUsers] = useState([])
    // navigateToPath on click on item
    const navigate = useNavigate();
    
    const [newPath, setNewPath] = useState('');
    const navigateToPath = (path) => {
      // Navigate to the new path
      setNewPath(`/${path}`);
    };
  useEffect(() => {
    // Get Friend List
    const getFriendList = async ()=>{
      const friendList = await fetchFriendList();
      // console.log(friendList.friends)
      setReqIds(friendList.friends);
    }
    getFriendList();

    // Getting alluser
    const getAllusers = async () => {
      const allUsers = await getAllUsersApi();
      setUsers(allUsers);
    }
    getAllusers();
    
    // Navigating
    if (newPath !== '') {
      window.history.replaceState(null, '', newPath);
      navigate(newPath);
    }

    if (!localStorage.authToken) {
      const path = "/auth";
      navigate(path);
    }
    // eslint-disable-next-line
  }, [newPath]);
  return (
    <>
    <TopBar />
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <LeftBar />
      <div className="people-section">
        {reqIds.length !== 0 ?<h4>Your Friends</h4>:<h4>No Friends to show</h4>}
        <div className="people_ProfileMain">
        {users.map((user)=> reqIds.some(element => element === user._id) && <div key={user._id} className="people_person">
            <div className="people_left">
              <div className="people_profilePic" 
              onClick={()=>{navigateToPath(`Profile/${user._id}`)}}
              style={{backgroundImage: `url(${user.profilePic})`}}></div>
              <h3 onClick={()=>{navigateToPath(`Profile/${user._id}`)}}>{user.name}</h3>
            </div>
            <div className="people_right">
              <button type="button">
                <span>
                <i class='bx bxs-heart-circle' ></i>
                </span>
                Friends
              </button>
              <button type="button" onClick={()=>{navigateToPath(`Profile/${user._id}`)}}>
                <span>
                  <i className="bx bxs-user-circle"></i>
                </span>
                View profile
              </button>
            </div>
          </div>)}
        </div>
      </div>
      <RightBar />
    </div>
    </>
  );
};

export default FriendList;