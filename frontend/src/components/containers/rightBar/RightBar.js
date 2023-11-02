import React, { useEffect, useState } from 'react'
import './rightBar.css'
import getAllUsersApi from '../functions/user/getAllUsersApi';

const RightBar = () => {
   // Other users list
   const [users, setUsers] = useState([])
   useEffect(() => {
      const getAllusers = async () => {
         const allUsers = await getAllUsersApi();
         setUsers(allUsers);
         console.log(users)
     }
     getAllusers();
      // eslint-disable-next-line
   }, [])
   return (
      <div className='rightBar'>
         <div className="otherUsers">
            <label>Other Users<span><i className='bx bx-search'></i></span></label>
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
      </div>
   )
}

export default RightBar