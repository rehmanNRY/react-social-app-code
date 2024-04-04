import React from 'react'
import './Profile.css'
import FriendsSuggestion from '../FriendsSuggestion/FriendsSuggestion'
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
import RightBar from "../RightBar/RightBar";

const Profile = ({user}) => {
  return (
    <div className='UserProfile'>
      <div className="profile_top">
        <div className="profile_cover"></div>
        <div className="profile_data">
          <div className="profile_pic" style={{backgroundImage: `url(${user.profilePic})`}}></div>
          <div className="profile_info">
            <h3>{user.name}</h3>
            <p>Here i am using Facebook your.</p>
          </div>
          <div className="profile_btns">
            <div className='user_profile-btns'>
              <button type="button"><span><i className='bx bxs-user-plus' ></i></span>Add friend</button>
              <button type="button"><span><i className='bx bxs-user-circle' ></i></span>View profile</button>
            </div>
          </div>
        </div>
      </div>
      <div className="profile_menu">
        <ul>
          <li><a href="/"><span><Home/></span>Home</a></li>
          <li><a href="/"><span><UserCheck/></span>Friends</a></li>
          <li><a href="/"><span><PlusSquare/></span>Suggestions</a></li>
          <li><a href="/"><span><Settings/></span>Settings</a></li>
          <li><a href="/"><span><Bookmark/></span>Bookmarks</a></li>
          <li><a href="/"><span><Mail/></span>Contact</a></li>
          <li><a href="/"><span><Smile/></span>Community</a></li>
        </ul>
      </div>
      <div className="userProfile_f_sugg">
        <div className="profile_btns">
          <div className='user_profile-btns'>
            <button type="button"><span><i className='bx bxs-user-plus' ></i></span>Add friend</button>
            <button type="button"><span><i className='bx bxs-user-circle' ></i></span>View profile</button>
          </div>
        </div>
        <FriendsSuggestion/>
      </div>
      <div className="userProfile_posts">
        <Posts postUserCheck={user._id}/>
        <RightBar />
      </div>
    </div>
  )
}

export default Profile