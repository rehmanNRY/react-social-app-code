import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../RightBar/RightBar";
import '../People/People.css'
import { fetchSentRequests } from "../containers/functions/FriendRequests/FriendRequests";
import getAllUsersApi from "../containers/functions/user/getAllUsersApi";

const SentReq = () => {
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
    // Get sent requests
    const getSentReq = async ()=>{
      const sentReq = await fetchSentRequests();
      // console.log(sentReq)
      setReqIds(sentReq);
    }
    getSentReq();

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
        {reqIds.length !== 0 ?<h4>Sent Requests</h4>:<h4>No Requests to show</h4>}
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
                  <i className='bx bxs-user-check'></i>
                </span>
                Request Sent
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

export default SentReq;