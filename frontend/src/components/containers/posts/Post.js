import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import "./post.css"
import getUserDetail from '../functions/user/userDetailApi';
import likePostApi from '../functions/likeShareComment/likePostApi';
import postCommentApi from '../functions/likeShareComment/postCommentApi';
import deleteCommentApi from '../functions/likeShareComment/deleteCommentApi';
import bookmarkPostApi from '../functions/bookmark/bookmarkPostApi';
import bookmarkListApi from '../functions/bookmark/bookmarkListApi';

const Post = (props) => {
  const { user_name, description, likes, date } = props.post;
  // Comment
  const [comments, setComments] = useState(props.post.comments);
  // Total number comments
  const [totalComments, setTotalComments] = useState(comments ? comments.length : 0);
  // List of users who liked post
  const [likerList, setLikerList] = useState("none")
  // Total number of likes of a post
  const [totalLikes, setTotalLikes] = useState(likes ? likes.length : 0);
  // Is post liked or not
  const [liked, setLiked] = useState(false);
  // Is post bookmarked or not
  const [bookmarked, setBookmarked] = useState(false);
  // Calcutate uploaded time ago
  const calculateTimeAgo = (postDate) => {
    return formatDistanceToNow(new Date(postDate), { addSuffix: true });
  }
  const [post_menu, setPost_menu] = useState("hidden");
  const [userId, setUserId] = useState(null);
  // Getting user detail
  useEffect(() => {
    // Getting user detail
    const userDetail = async () => {
      const user = await getUserDetail();
      setUserId(user._id);
    }
    userDetail();
    // Is post liked or not
    if (likes.some(like => like.user_id === userId)) {
      setLiked(true);
    }
    // Getting bookmark list
    const bookmarkList = async () => {
      const bookmarkPosts = await bookmarkListApi();
      // Check if the target post is in the bookmarkedPosts array
      const isBookmarked = bookmarkPosts.some(post => post._id === props.post._id);
      setBookmarked(isBookmarked);
    };
    bookmarkList();
    // eslint-disable-next-line
  }, [likes, userId]);

  const postMenuClick = () => {
    if (post_menu === "visible") {
      setPost_menu("hidden");
    } else {
      setPost_menu("visible");
    }
  }
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
        const likeIndex = likes.findIndex(like => like.user_id === userId);
        if (likeIndex !== -1) {
          likes.splice(likeIndex, 1);
        }
      } else {
        console.log(json);
      }
    } catch (error) {
      console.log("Some error occur in likeing post")
    }
  }
  const displayLikerList = () => {
    setLikerList("block");
  }
  const hideLikerList = () => {
    setLikerList("none");
  }
  // Comment
  const [comment_desc, setComment_desc] = useState("");
  // Comment description on change
  const comment_descChng = (e) => {
    setComment_desc(e.target.value);
  }
  const newComment = async (e, id) => {
    e.preventDefault();
    const json = await postCommentApi(id, comment_desc);
    if (json.success) {
      const newComment = json.comment;
      setComments([newComment, ...comments])
      setTotalComments(comments.length + 1)
      // Clear the comment input
      setComment_desc("");
    } else {
      console.log(json, "some error occured")
    }
  }
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
  }
  const deleteComment = async (comment_id) => {
    try {
      // Wait for api call and delete comment from backend
      const json = await deleteCommentApi(comment_id);
      if (json.success) {
        // Filter out the deleted comment from the comments state
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== comment_id));
        setTotalComments(totalComments - 1); // Decrement the total comment count
      } else {
        console.log(json, "error occurred while deleting the comment");
      }
    } catch (error) {
      console.error("An error occurred while deleting the comment", error);
    }
  }
  const [openCommentId, setOpenCommentId] = useState(null);
  const commentMenuClick = (commentId) => {
    if (openCommentId === commentId) {
      setOpenCommentId(null);
    } else {
      setOpenCommentId(commentId);
    }
  }
  // Bookmark post
  const bookmarkPost = async (postId)=>{
    const json = await bookmarkPostApi(postId);
    setBookmarked(json.success === "Post bookmarked successfully");
  }
  return (
    <div className='post'>
      <div className="post_top">
        <div className='post_profile'>
          <div className="post_profile-pic"></div>
          <div>
            <label htmlFor="">{user_name}</label>
            <h4>{calculateTimeAgo(date)}</h4>
          </div>
        </div>
        <ul>
          {props.post.user === userId && <div className="post_menu" onClick={postMenuClick} style={{ visibility: `${post_menu}` }}>
            <button type="button" style={{ cursor: "not-allowed" }}>
              <span><i className='bx bxs-edit' ></i></span>Edit
            </button>
            <button type="button" onClick={() => { props.deletePost(props.post._id) }}>
              <span><i className='bx bxs-trash-alt'></i></span>Delete
            </button>
          </div>}
          <li className='bookmarkIcon' onClick={()=>{bookmarkPost(props.post._id)}}>
            {bookmarked ? <i  style={{animation: "2s myAni"}} className='bx bxs-bookmark'></i> : <i className='bx bx-bookmark'></i>}
          </li>
          {props.post.user === userId && <li onClick={postMenuClick}><i className='bx bx-menu-alt-right'></i></li>}
        </ul>
      </div>
      <div className="post_content">
        <p>{description}</p>
      </div>
      <ul className='likers_list' style={{ display: `${likerList}` }}>
        {likes.map((like) => {
          return <li key={like.user_id}>{like.liker_name}</li>
        })}
      </ul>
      {likes && <div className="post_likers" onMouseOver={displayLikerList} onMouseOut={hideLikerList}>
        <div>
          <div></div>
          <div></div>
        </div>
        <p>Liked by {totalLikes} people</p>
      </div>}
      <div className="post_bottom">
        <button type="button"
          className={liked ? "btn_liked" : ""}
          onClick={() => { likePost(props.post._id) }}>
          <span>
            {liked ? <i className='bx bxs-like'></i> : <i className='bx bx-like'></i>}
          </span>
          {liked ? "Liked" : "Like"}
          <span>{totalLikes}</span>
        </button>
        <button type="button">
          <span><i className='bx bx-comment-detail' ></i></span>
          Comment
          <span>{totalComments}</span>
        </button>
        <button type="button">
          <span><i className='bx bx-share'></i></span>
          Share
          <span>0</span>
        </button>
      </div>
      <form autoComplete='off' onSubmit={(e) => { newComment(e, props.post._id) }}>
        <div></div>
        <input type="text" value={comment_desc} name="post_desc" required onChange={comment_descChng} placeholder={`What's your opinion, ${user_name || "user"}?`} />
        <button type="submit">
          <i className='bx bxs-send'></i>
          <i className='bx bx-send'></i>
        </button>
      </form>
      {comments.length > 0 && <div className='cmnts_sort'>
        <h4>All comments</h4>
        <p>Sort by <span>Oldest</span></p>
      </div>}
      <div className="comments">
        {comments.map((comment) => {
          const isCommentMenuOpen = openCommentId === comment._id;
          return (
            <div className={`comment ${viewCmnts}`} key={comment._id}>
              <div className='commentProfilePic'></div>
              <div>
                <h4>
                  {comment.user_name}:
                  {userId === comment.user_id && (
                    <div className="comment_menu" onClick={() => commentMenuClick(comment._id)} style={{ visibility: isCommentMenuOpen ? 'visible' : 'hidden' }}>
                      <button type="button" onClick={() => { deleteComment(comment._id) }}>
                        <span><i className='bx bxs-trash-alt'></i></span>Delete
                      </button>
                    </div>
                  )}
                  {userId === comment.user_id && (
                    <button type="button" onClick={() => commentMenuClick(comment._id)}>
                      <i className='bx bx-dots-horizontal-rounded'></i>
                    </button>
                  )}
                </h4>
                <p>{comment.description}<span>{calculateTimeAgo(comment.date)}</span></p>
              </div>
            </div>
          );
        })}
        {comments.length > 1 && <div className="comments_bottom">
          <button type="button" onClick={viewAllCmnt}>{viewCmntsBtn}</button>
        </div>}
      </div>
    </div>
  )
}

export default Post;