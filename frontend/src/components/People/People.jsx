import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../RightBar/RightBar";
import '../People/People.css'
import getAllUsersApi from "../containers/functions/user/getAllUsersApi";
import getUserDetail from "../containers/functions/user/userDetailApi";
import { acceptFriendRequest, fetchFriendList, fetchReceivedRequests, fetchSentRequests, sendFriendRequest } from "../containers/functions/FriendRequests/FriendRequests";

const People = () => {
  const [users, setUsers] = useState([])

  const [reqIds, setReqIds] = useState([])
  const [frndList, setFrndList] = useState([])
  const [sentIds, setSentIds] = useState([])

  const [userId, setUserId] = useState(null);
    // navigateToPath on click on item
    const navigate = useNavigate();
    const location = useLocation();
    
    const [newPath, setNewPath] = useState('');
    const navigateToPath = (path) => {
      // Clear previous path
      const currentPath = location.pathname;
      let updatedPath = '';
      // Navigate to the new path
      setNewPath(`/${path}`);
    };
  useEffect(() => {
    // Get pending requests
    const getPendingReq = async ()=>{
      const penReq = await fetchReceivedRequests();
      setReqIds(penReq.pendingRequests);
    }
    getPendingReq();

    // Get Friend List
    const getFriendList = async ()=>{
      const friendList = await fetchFriendList();
      // console.log(friendList.friends)
      setFrndList(friendList.friends);
    }
    getFriendList();

    // Get sent requests
    const getSentReq = async ()=>{
      const sentReq = await fetchSentRequests();
      // console.log(sentReq)
      setSentIds(sentReq);
    }
    getSentReq();

    // Navigating
    if (newPath !== '') {
      window.history.replaceState(null, '', newPath);
      navigate(newPath);
    }

    // Getting alluser
    const getAllusers = async () => {
      const allUsers = await getAllUsersApi();
      setUsers(allUsers);
    }
    getAllusers();

    // Getting user detail
    const userDetail = async () => {
      const user = await getUserDetail();
      setUserId(user._id);
    };
    userDetail();

    if (!localStorage.authToken) {
      const path = "/auth";
      navigate(path);
    }
    // eslint-disable-next-line
  }, [newPath]);

  const handleSendReq = async (receiverUserId) => {
    try {
      const reqSnd = await sendFriendRequest(receiverUserId);
      console.log(reqSnd);
      // alert('Friend request sent successfully!');
      setSentIds([...sentIds, receiverUserId]);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  // Accept Request
  const handleAcceptReq = async (senderId) => {
    try {
      const acceptSnd = await acceptFriendRequest(senderId);
      // console.log(acceptSnd);
      setFrndList([...frndList, senderId]);
      // alert('Friend request sent successfully!');
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };
  return (
    <>
    <TopBar />
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <LeftBar />
      <div className="people-section">
        <h4>Other Peoples</h4>
        <div className="people_ProfileMain">
          {users.map((user)=> <div key={user._id} className="people_person">
            <div className="people_left">
              <div className="people_profilePic" 
              onClick={()=>{navigateToPath(`Profile/${user._id}`)}}
              style={{backgroundImage: `url(${user.profilePic})`}}></div>
              <h3 onClick={()=>{navigateToPath(`Profile/${user._id}`)}}>{user.name}</h3>
            </div>
            <div className="people_right">
            {(userId !== user._id) && !sentIds.some(element => element === user._id) && !reqIds.some(element => element === user._id) && !frndList.some(element => element === user._id) && <button type="button" onClick={()=>{handleSendReq(user._id)}}>
                <span>
                  <i className="bx bxs-user-plus"></i>
                </span>
                Send Request
              </button> }
              {(userId !== user._id) && !reqIds.some(element => element === user._id) && !frndList.some(element => element === user._id) && sentIds.some(element => element === user._id) && <button type="button">
                <span>
                  <i className='bx bxs-user-check' ></i>
                </span>
                Request Sent
              </button> }
              {(userId !== user._id) && !sentIds.some(element => element === user._id) && reqIds.some(element => element === user._id) && !frndList.some(element => element === user._id) && <button type="button" onClick={()=>{handleAcceptReq(user._id)}}>
                <span>
                  <i className="bx bxs-user-plus"></i>
                </span>
                Accept Request
              </button>}
              {(userId !== user._id) && frndList.some(element => element === user._id) && !reqIds.some(element => element === user._id) && !sentIds.some(element => element === user._id) && <button type="button">
                <span>
                <i className='bx bxs-heart-circle'></i>
                </span>
                Friends
              </button>}
              {(userId === user._id) && !frndList.some(element => element === user._id) && !reqIds.some(element => element === user._id) && !sentIds.some(element => element === user._id) && <button type="button">
                <span>
                <i className='bx bxs-heart-square' ></i>
                </span>
                Your account
              </button>}
              <button type="button" onClick={()=>{navigateToPath(`Profile/${user._id}`)}}>
                <span>
                  <i className="bx bxs-user-circle"></i>
                </span>
                View profile
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
      <RightBar />
    </div>
    </>
  );
};

export default People;