import React, { useEffect, useState } from 'react'
import './RightBar.css'
import getAllUsersApi from '../containers/functions/user/getAllUsersApi';
import userDetailApi from '../containers/functions/user/userDetailApi';
import { useLocation, useNavigate } from 'react-router-dom';

const RightBar = () => {
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


   // Other users list
   const [users, setUsers] = useState([])
   const [userData, setUserData] = useState({})
   useEffect(() => {
      
      // Navigating
      if (newPath !== '') {
      window.history.replaceState(null, '', newPath);
      navigate(newPath);
      }


      // Getting user detail
      const userDetail = async ()=>{
         const user = await userDetailApi();
         setUserData(user);
      }
      userDetail();
      // Getting alluser
      const getAllusers = async () => {
         const allUsers = await getAllUsersApi();
         setUsers(allUsers);
     }
     getAllusers();
      // eslint-disable-next-line
   }, [newPath])

   return (
      <div className='rightbar_warpper'>
         <div className='rightBar'>
            <div className="rightBar_user" onClick={()=>{navigateToPath(`Profile/${userData._id}`)}}>
               <div className="rightBar_user-top">
                  <div style={{backgroundImage: `url(${userData.profilePic})`}}></div>
                  <h4>{userData.name}</h4>
               </div>
               {/* <div className="rightBar_user-buttom">
                  <div><h5>101k</h5><span>Reacts</span></div>
                  <div><h5>50k</h5><span>Following</span></div>
                  <div><h5>364</h5><span>Posts</span></div>
               </div> */}
            </div>
            <label>Recent Contributions</label>
            <div className="rightbar_recentCon">
               {users.slice(0, 6).map((user)=> <div style={{backgroundImage: `url(${user.profilePic})`}} key={user._id}></div>)}
               <div>{users.length}+</div>
            </div>
            <label>Other Users</label>
            <ul>
               {users.slice(0, 4).map((user)=>{
                  return (
                     <li key={user._id} onClick={()=>{navigateToPath(`Profile/${user._id}`)}}>
                        <div style={{backgroundImage: `url(${user.profilePic})`}}></div>
                        <h4>{user.name}</h4>
                     </li>
                  ) 
               })}
            </ul>
            <label>Similar Users</label>
            <ul>
               {users.map((user)=>{
                  return (
                     <li key={user._id} onClick={()=>{navigateToPath(`Profile/${user._id}`)}}>
                        <div style={{backgroundImage: `url(${user.profilePic})`}}></div>
                        <h4>{user.name}</h4>
                     </li>
                  ) 
               })}
            </ul>
         </div>
      </div>
   )
}

export default RightBar