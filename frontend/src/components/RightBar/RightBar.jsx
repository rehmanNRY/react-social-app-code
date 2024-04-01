import React, { useEffect, useState } from 'react'
import './RightBar.css'
import getAllUsersApi from '../containers/functions/user/getAllUsersApi';
import userDetailApi from '../containers/functions/user/userDetailApi';

const RightBar = () => {
   // Other users list
   const [users, setUsers] = useState([])
   const [userData, setUserData] = useState([])
   useEffect(() => {
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
   }, [])
   return (
      <div className='rightBar'>
         <div className="rightBar_user">
            <div className="rightBar_user-top">
               <div></div>
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
            {[1,2,3,4,5,6].map((user)=> <div key={user}></div>)}
            <div>8+</div>
         </div>
         <label>Other Users</label>
         <ul>
            {users.map((user)=>{
               return (
                  <li key={user._id}>
                     <div></div>
                     <h4>{user.name}</h4>
                  </li>
               ) 
            })}
         </ul>
         <label>Similar Users</label>
         <ul>
            {users.map((user)=>{
               return (
                  <li key={user._id}>
                     <div></div>
                     <h4>{user.name}</h4>
                  </li>
               ) 
            })}
         </ul>
      </div>
   )
}

export default RightBar