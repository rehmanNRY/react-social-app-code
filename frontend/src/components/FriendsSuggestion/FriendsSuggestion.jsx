import React from 'react'
import './FriendsSuggestion.css'

const FriendsSuggestion = () => {
  return (
    <div className='friends_suggestion'>
      {[1,2,3,4,5].map((item)=> <div className='friend_suggested'>
        <div className="friend_suggestPic"></div>
        <h3>Abdul Rehman</h3>
        <button type="button"><span><i className='bx bxs-user-plus' ></i></span>Add friend</button>
      </div> )}
    </div>
  )
}

export default FriendsSuggestion