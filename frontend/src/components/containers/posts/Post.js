import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import "./post.css"
import getUserDetail from '../functions/userDetailApi';
import likePostApi from '../functions/likePostApi';
import postCommentApi from '../functions/postCommentApi';
import deleteCommentApi from '../functions/deleteCommentApi';

const Post = (props) => {
  const [comments, setComments] = useState(props.post.comments);
  const [likerList, setLikerList] = useState("none")
  const { user_name, description, likes, date } = props.post;
  // Post total likes
  const [totalLikes, setTotalLikes] = useState(likes ? likes.length : 0);
  const [totalComments, setTotalComments] = useState(comments ? comments.length : 0);
  // Delete and like Post
  const { deletePost } = props;
  // Calcutate post uploaded time ago
  const calculateTimeAgo = (postDate) => {
    return formatDistanceToNow(new Date(postDate), { addSuffix: true });
  }
  const [post_menu, setPost_menu] = useState("hidden");
  const [userId, setUserId] = useState(null);
  const [liked, setLiked] = useState(false);
  // Getting user detail
  useEffect(() => {
    // Getting user detail
    const userDetail = async () => {
      const user = await getUserDetail();
      setUserId(user._id);
      if (likes.some(like => like.user_id === user._id)) {
        setLiked(true);
      }
    }
    userDetail();
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
    // console.log(json);
    if (json.success) {
      const newComment = {
        user_name: user_name,
        description: comment_desc,
        date: new Date().toISOString(),
      };
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
            <button type="button" onClick={() => { deletePost(props.post._id) }}><span><i className='bx bxs-trash-alt'></i></span>Delete</button>
          </div>}
          <li><i className='bx bx-bookmark'></i></li>
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
      <div className='cmnts_sort'>
        <h4>All comments</h4>
        <p>Sort by <span>Oldest</span></p>
      </div>
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
        <div className="comments_bottom">
          <button type="button" onClick={viewAllCmnt}>{viewCmntsBtn}</button>
        </div>
      </div>
    </div>
  )
}

export default Post;