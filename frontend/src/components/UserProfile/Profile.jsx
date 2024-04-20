import React, {useState, useEffect} from 'react'
import './Profile.css'
// import FriendsSuggestion from '../FriendsSuggestion/FriendsSuggestion'
import {
  Home,
  UserCheck,
  PlusSquare,
  Settings,
  Bookmark,
  Mail,
  Smile,
} from "react-feather";
import Posts from '../Posts/Posts';
import getUserDetail from "../containers/functions/user/userDetailApi";
import RightBar from "../RightBar/RightBar";
import { acceptFriendRequest, fetchFriendList, fetchReceivedRequests, fetchSentRequests, sendFriendRequest } from '../containers/functions/FriendRequests/FriendRequests';

const Profile = ({user}) => {
  const [reqIds, setReqIds] = useState([])
  const [frndList, setFrndList] = useState([])
  const [sentIds, setSentIds] = useState([])
  const [userId, setUserId] = useState(null);

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

    // Getting user detail
    const userDetail = async () => {
      const user = await getUserDetail();
      setUserId(user._id);
    };
    userDetail();

    // eslint-disable-next-line
  }, []);

  // Send Request
  const handleSendReq = async (receiverUserId) => {
    try {
      const reqSnd = await sendFriendRequest(receiverUserId);
      // console.log(reqSnd);
      setSentIds([...sentIds, receiverUserId]);
      // alert('Friend request sent successfully!');
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
    <div className='UserProfile'>
      <div className="profile_top">
        <div className="profile_cover"></div>
        <div className="profile_data">
          <div className='profile_infoDetail'>
          <div className="profile_pic" style={{backgroundImage: `url(${user.profilePic})`}}></div>
          <div className="profile_info">
            <h3>{user.name}</h3>
            <p>Yo! Abdul Rehman's app user.</p>
          </div>

          </div>
          <div className="profile_btns">
            <div className='user_profile-btns'>
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
              <button type="button"><span><i className='bx bxs-user-circle' ></i></span>View profile</button>
            </div>
          </div>
        </div>
      </div>
      <div className="profile_menu">
        <ul>
          <li><a><span><Home/></span>Home</a></li>
          <li><a><span><UserCheck/></span>Friends</a></li>
          <li><a><span><PlusSquare/></span>Suggestions</a></li>
          <li><a><span><Settings/></span>Settings</a></li>
          <li><a><span><Bookmark/></span>Bookmarks</a></li>
          <li><a><span><Mail/></span>Contact</a></li>
          <li><a><span><Smile/></span>Community</a></li>
        </ul>
      </div>
      {/* <div className="userProfile_f_sugg">
        <div className="profile_btns">
          <div className='user_profile-btns'>
            <button type="button"><span><i className='bx bxs-user-plus' ></i></span>Add friend</button>
            <button type="button"><span><i className='bx bxs-user-circle' ></i></span>View profile</button>
          </div>
        </div>
        <FriendsSuggestion/>
      </div> */}
      <div className="userProfile_posts">
        <Posts postUserCheck={user._id} heading={false}/>
        <RightBar />
      </div>
    </div>
  )
}

export default Profile