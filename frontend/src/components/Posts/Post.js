import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import "./post.css";
import getUserDetail from "../containers/functions/user/userDetailApi";
import likePostApi from "../containers/functions/likeShareComment/likePostApi";
import postCommentApi from "../containers/functions/likeShareComment/postCommentApi";
import deleteCommentApi from "../containers/functions/likeShareComment/deleteCommentApi";
import bookmarkPostApi from "../containers/functions/bookmark/bookmarkPostApi";
import bookmarkListApi from "../containers/functions/bookmark/bookmarkListApi";
import userDetailUsingId from "../containers/functions/user/userDetailUsingId";
import { useNavigate } from "react-router-dom";
import { acceptFriendRequest, fetchFriendList, fetchReceivedRequests, fetchSentRequests, sendFriendRequest } from "../containers/functions/FriendRequests/FriendRequests";

const Post = (props) => {
  const { user_name, description, likes, date } = props.post;
  // Comment
  const [comments, setComments] = useState(props.post.comments);
  // Total number comments
  const [totalComments, setTotalComments] = useState(
    comments ? comments.length : 0
  );
  // List of users who liked post
  const [likerList, setLikerList] = useState("none");
  // List of users who liked post
  const [userProfile, setUserProfile] = useState("none");
  // Total number of likes of a post
  const [totalLikes, setTotalLikes] = useState(likes ? likes.length : 0);
  // Is post liked or not
  const [liked, setLiked] = useState(false);
  // Is post bookmarked or not
  const [bookmarked, setBookmarked] = useState(false);
  // Calcutate uploaded time ago
  const calculateTimeAgo = (postDate) => {
    return formatDistanceToNow(new Date(postDate), { addSuffix: true });
  };
  const [post_menu, setPost_menu] = useState("hidden");
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({});
  const [postUser, setPostUser] = useState({});
  const [commentUser, setCommentUser] = useState([]);

  const [reqIds, setReqIds] = useState([])
  const [frndList, setFrndList] = useState([])
  const [sentIds, setSentIds] = useState([])
  // navigateToPath on click on item
  const navigate = useNavigate();
  
  const [newPath, setNewPath] = useState('');
  const navigateToPath = (path) => {
    // Navigate to the new path
    setNewPath(`/${path}`);
  };
  // Getting user detail
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
    
    // Getting user detail
    const userDetail = async () => {
      const user = await getUserDetail();
      setUserData(user);
      setUserId(user._id);
    };
    userDetail();

    // Getting Post User Detail
    const postUserDetail = async () => {
      const post_User = await userDetailUsingId(props.post.user);
      setPostUser(post_User);
    };
    postUserDetail();

    // Getting user details for all comments
    const fetchCommentUserDetails = async () => {
      const userDetailsPromises = comments.map((comment) =>
        userDetailUsingId(comment.user_id)
      );
      const commentUserDetails = await Promise.all(userDetailsPromises);
      setCommentUser(commentUserDetails);
    };
    fetchCommentUserDetails();

    // Is post liked or not
    if (likes.some((like) => like.user_id === userId)) {
      setLiked(true);
    }
    // Getting bookmark list
    const bookmarkList = async () => {
      const bookmarkPosts = await bookmarkListApi();
      // Check if the target post is in the bookmarkedPosts array
      const isBookmarked = bookmarkPosts.some(
        (post) => post._id === props.post._id
      );
      setBookmarked(isBookmarked);
    };
    bookmarkList();
    // eslint-disable-next-line
  }, [likes, userId, newPath]);

  const postMenuClick = () => {
    if (post_menu === "visible") {
      setPost_menu("hidden");
    } else {
      setPost_menu("visible");
    }
  };
  const likePost = async (id) => {
    try {
      const json = await likePostApi(id);
      if (json.like) {
        setLiked(true);
        setTotalLikes(totalLikes + 1);
        likes.push({ user_id: userId, liker_name: user_name });
      } else if (json.dislike) {
        setLiked(false);
        setTotalLikes(totalLikes - 1);
        // Remove the like from the likes array
        const likeIndex = likes.findIndex((like) => like.user_id === userId);
        if (likeIndex !== -1) {
          likes.splice(likeIndex, 1);
        }
      } else {
        console.log(json);
      }
    } catch (error) {
      console.log("Some error occur in likeing post");
    }
  };
  const displayLikerList = () => {
    setLikerList("block");
  };
  const hideLikerList = () => {
    setLikerList("none");
  };
  const displayUserProfile = () => {
    setUserProfile("block");
  };
  const hideUserProfile = () => {
    setUserProfile("none");
  };
  // Comment
  const [comment_desc, setComment_desc] = useState("");
  // Comment description on change
  const comment_descChng = (e) => {
    setComment_desc(e.target.value);
  };
  const newComment = async (e, id) => {
    e.preventDefault();
    const json = await postCommentApi(id, comment_desc);
    if (json.success) {
      const newComment = json.comment;
      setComments([newComment, ...comments]);
      setTotalComments(comments.length + 1);
      // Clear the comment input
      setComment_desc("");
    } else {
      console.log(json, "some error occured");
    }
  };
  // View all comments
  const [viewCmnts, setViewCmnts] = useState("");
  const [viewCmntsBtn, setViewCmntsBtn] = useState("View all comments");
  const viewAllCmnt = () => {
    if (viewCmnts === "") {
      setViewCmnts("viewComments");
      setViewCmntsBtn("View less comments");
    } else {
      setViewCmnts("");
      setViewCmntsBtn("View all comments");
    }
  };
  const deleteComment = async (comment_id) => {
    try {
      // Wait for api call and delete comment from backend
      const json = await deleteCommentApi(comment_id);
      if (json.success) {
        // Filter out the deleted comment from the comments state
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== comment_id)
        );
        setTotalComments(totalComments - 1); // Decrement the total comment count
      } else {
        console.log(json, "error occurred while deleting the comment");
      }
    } catch (error) {
      console.error("An error occurred while deleting the comment", error);
    }
  };
  const [openCommentId, setOpenCommentId] = useState(null);
  const commentMenuClick = (commentId) => {
    if (openCommentId === commentId) {
      setOpenCommentId(null);
    } else {
      setOpenCommentId(commentId);
    }
  };
  // Bookmark post
  const bookmarkPost = async (postId) => {
    const json = await bookmarkPostApi(postId);
    setBookmarked(json.success === "Post bookmarked successfully");
  };

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
    <>
    {(!(props.bookmarksCheck) || (props.bookmarksCheck && bookmarked)) && (<div className="post">
      <div
        className="user_profile"
        style={{ display: `${userProfile}` }}
        onMouseOver={displayUserProfile}
        onMouseOut={hideUserProfile}
      >
        <div onClick={()=>{navigateToPath(`Profile/${postUser._id}`)}} className="user_profile_Top">
          <div style={{ backgroundImage: `url(${postUser.profilePic})` }}></div>
          <h4>{user_name}</h4>
        </div>
        <div className="user_profile-btns">
          {(userId !== postUser._id) && !sentIds.some(element => element === postUser._id) && !reqIds.some(element => element === postUser._id) && !frndList.some(element => element === postUser._id) && <button type="button" onClick={()=>{handleSendReq(userId)}}>
            <span>
              <i className="bx bxs-user-plus"></i>
            </span>
            Send Request
          </button> }
          {(userId !== postUser._id) && !reqIds.some(element => element === postUser._id) && !frndList.some(element => element === postUser._id) && sentIds.some(element => element === postUser._id) && <button type="button">
            <span>
              <i className='bx bxs-user-check' ></i>
            </span>
            Request Sent
          </button> }
          {(userId !== postUser._id) && !sentIds.some(element => element === postUser._id) && reqIds.some(element => element === postUser._id) && !frndList.some(element => element === postUser._id) && <button type="button" onClick={()=>{handleAcceptReq(postUser._id)}}>
            <span>
              <i className="bx bxs-user-plus"></i>
            </span>
            Accept Request
          </button>}
          {(userId !== postUser._id) && frndList.some(element => element === postUser._id) && !reqIds.some(element => element === postUser._id) && !sentIds.some(element => element === postUser._id) && <button type="button">
            <span>
            <i className='bx bxs-heart-circle'></i>
            </span>
            Friends
          </button>}
          {(userId === postUser._id) && !frndList.some(element => element === postUser._id) && !reqIds.some(element => element === postUser._id) && !sentIds.some(element => element === postUser._id) && <button type="button">
            <span>
            <i className='bx bxs-heart-square' ></i>
            </span>
            Your account
          </button>}
          <button type="button" onClick={()=>{navigateToPath(`Profile/${postUser._id}`)}}>
            <span>
              <i className="bx bxs-user-circle"></i>
            </span>
            View profile
          </button>
        </div>
      </div>
      <div className="post_top">
        <div
          className="post_profile"
          onMouseOver={displayUserProfile}
          onMouseOut={hideUserProfile}
          onClick={()=>{navigateToPath(`Profile/${postUser._id}`)}}
        >
          <div
            className="post_profile-pic"
            style={{ backgroundImage: `url(${postUser.profilePic})` }}
          ></div>
          <div>
            <label htmlFor="">{user_name}</label>
            <h4>{calculateTimeAgo(date)}</h4>
          </div>
        </div>
        <ul>
          {props.post.user === userId && (
            <div
              className="post_menu"
              onClick={postMenuClick}
              style={{ visibility: `${post_menu}` }}
            >
              <button type="button" style={{ cursor: "not-allowed" }}>
                <span>
                  <i className="bx bxs-edit"></i>
                </span>
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  props.deletePost(props.post._id);
                }}
              >
                <span>
                  <i className="bx bxs-trash-alt"></i>
                </span>
                Delete
              </button>
            </div>
          )}
          <li
            className="bookmarkIcon"
            onClick={() => {
              bookmarkPost(props.post._id);
            }}
          >
            {bookmarked ? (
              <i
                style={{ animation: "2s myAni" }}
                className="bx bxs-bookmark"
              ></i>
            ) : (
              <i className="bx bx-bookmark"></i>
            )}
          </li>
          {props.post.user === userId && (
            <li onClick={postMenuClick}>
              <i className="bx bx-menu-alt-right"></i>
            </li>
          )}
        </ul>
      </div>
      <div className="post_content">
        <p>{description}</p>
      </div>
      <ul className="likers_list" style={{ display: `${likerList}` }}>
        {likes.map((like) => {
          return <li key={like.user_id}>{like.liker_name}</li>;
        })}
      </ul>
      {likes && (
        <div
          className="post_likers"
          onMouseOver={displayLikerList}
          onMouseOut={hideLikerList}
        >
          <div>
            <div></div>
            <div></div>
          </div>
          <p>Liked by {totalLikes} people</p>
        </div>
      )}
      <div className="post_bottom">
        <button
          type="button"
          className={liked ? "btn_liked" : ""}
          onClick={() => {
            likePost(props.post._id);
          }}
        >
          <span>
            {liked ? (
              <i className="bx bxs-like"></i>
            ) : (
              <i className="bx bx-like"></i>
            )}
          </span>
          {liked ? "Liked" : "Like"}
          <span>{totalLikes}</span>
        </button>
        <button type="button">
          <span>
            <i className="bx bx-comment-detail"></i>
          </span>
          Comment
          <span>{totalComments}</span>
        </button>
        <button type="button">
          <span>
            <i className="bx bx-share"></i>
          </span>
          Share
          <span>0</span>
        </button>
      </div>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          newComment(e, props.post._id);
        }}
      >
        <div style={{ backgroundImage: `url(${userData.profilePic})` }}></div>
        <input
          type="text"
          value={comment_desc}
          name="post_desc"
          required
          onChange={comment_descChng}
          placeholder={`What's your opinion, ${userData.name || "user"}?`}
        />
        <button type="submit">
          <i className="bx bxs-send"></i>
          <i className="bx bx-send"></i>
        </button>
      </form>
      {comments.length > 0 && (
        <div className="cmnts_sort">
          <h4>All comments</h4>
          <p>
            Sort by <span>Oldest</span>
          </p>
        </div>
      )}
      <div className="comments">
        {comments.map((comment) => {
          const isCommentMenuOpen = openCommentId === comment._id;
          const userDetail = commentUser.find(
            (user) => user._id === comment.user_id
          );
          return (
            <div className={`comment ${viewCmnts}`} key={comment._id}>
              <div
                className="commentProfilePic"
                style={{ backgroundImage: `url(${userDetail?.profilePic})` }}
                onClick={()=>{navigateToPath(`Profile/${comment.user_id}`)}}
              ></div>
              <div className="commentDes_div">
                <div className="comment_topBar">
                  <h4 onClick={()=>{navigateToPath(`Profile/${comment.user_id}`)}}>
                  {comment.user_name}:
                  </h4>
                  <div className="comments_MenuSection">
                    {userId === comment.user_id && (
                      <>
                      <button
                        type="button"
                        onClick={() => commentMenuClick(comment._id)}
                      >
                        <i className="bx bx-dots-horizontal-rounded"></i>
                      </button>
                      <div
                        className="comment_menu"
                        onClick={() => commentMenuClick(comment._id)}
                        style={{
                          visibility: isCommentMenuOpen ? "visible" : "hidden",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            deleteComment(comment._id);
                          }}
                        >
                          <span>
                            <i className="bx bxs-trash-alt"></i>
                          </span>
                          Delete
                        </button>
                      </div>
                      </>
                    )}
                  </div>
                </div>
                <p>
                  {comment.description}
                  <span>{calculateTimeAgo(comment.date)}</span>
                </p>
              </div>
            </div>
          );
        })}
        {comments.length > 1 && (
          <div className="comments_bottom">
            <button type="button" onClick={viewAllCmnt}>
              {viewCmntsBtn}
            </button>
          </div>
        )}
      </div>
    </div>)}
    </>
  );
};

export default Post;