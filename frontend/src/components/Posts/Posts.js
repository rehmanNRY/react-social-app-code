import React, { useEffect, useState } from 'react';
import Post from './Post';
import "./posts.css";
import userDetailApi from '../containers/functions/user/userDetailApi';
import deletePostApi from '../containers/functions/post/deletePostApi';
import publishPostApi from '../containers/functions/post/publishPostApi';
import fetchPostsApi from '../containers/functions/post/fetchPostsApi';

const Posts = ({ postUserCheck, heading, checkBookmark }) => {
  const [bookmarksCheck, setbookmarksCheck] = useState(false);
  const [posts, setPosts] = useState([]);
  const [post_desc, setPost_desc] = useState("");
  const [user, setUser] = useState({});
  const [showPostForm, setShowPostForm] = useState(true); // Show post form by default

  useEffect(() => {
    if(checkBookmark){
      setbookmarksCheck(true)
    }else{
      setbookmarksCheck(false);
    }
    const fetchData = async () => {
      try {
        const json = await fetchPostsApi();
        setPosts(json);
      } catch (error) {
        console.log("Some error occurred");
      }
    };

    const userDetail = async () => {
      try {
        const user = await userDetailApi();
        setUser(user);
        // Set showPostForm to true if postUserCheck doesn't exist or is null
        setShowPostForm(!postUserCheck || postUserCheck === user._id);
      } catch (error) {
        console.log("Some error occurred");
      }
    };

    fetchData();
    userDetail();
  }, [postUserCheck]);

  const post_descChng = (e) => {
    setPost_desc(e.target.value);
  };

  const publishPost = async (description) => {
    try {
      const json = await publishPostApi(description);
      // Prepend the new post to the posts array
      setPosts([...posts, json]);
      setPost_desc("");
    } catch (error) {
      console.log("Some error occurred");
    }
  };
  

  const newPost = (e) => {
    e.preventDefault();
    publishPost(post_desc);
  };

  const deletePost = async (id) => {
    try {
      const json = await deletePostApi(id);
      if (json.success) {
        setPosts([...posts, json]);
        const newPosts = posts.filter((post) => post._id !== id);
        setPosts(newPosts);
      } else {
        console.log("Some error occurred", json);
      }
    } catch (error) {
      console.log("Some error occurred");
    }
  };

  return (
    <div className='posts_main'>
      {(showPostForm && !(checkBookmark) && !(postUserCheck)) && ( // Conditionally render post form
        <form className="posts-new_post" autoComplete='off' onSubmit={newPost}>
          <div className='posts-new_post-top'>
            <div style={{backgroundImage: `url(${user.profilePic})`}}></div>
            <input type="text" value={post_desc} name="post_desc" required onChange={post_descChng} placeholder={`What's in your mind today, ${user.name || "user"}?`} />
          </div>
          <div className='posts-new_post-bottom'>
            <ul>
              <li><i className='bx bx-camera'></i></li>
              <li><i className='bx bx-image' ></i></li>
              <li><i className='bx bx-paperclip' ></i></li>
              <li><i className='bx bxs-edit-location'></i></li>
              <li><i className='bx bx-face'></i></li>
            </ul>
            <div>
              <button type="button" style={{ cursor: "not-allowed" }}>Draft</button>
              <button type="submit">Post</button>
            </div>
          </div>
        </form>
      )}
      {posts.length === 0 && <h3 className='noPostText'>No posts to show</h3>}
      {heading && <h3 className='postsHeadingProp'>{heading}</h3>}
      {posts.slice().reverse().map((post) => {
        if (!postUserCheck || postUserCheck === post.user) {
          return <Post key={post._id} post={post} deletePost={deletePost} bookmarksCheck={bookmarksCheck} />;
        }
        return null;
      })}
    </div>
  );
};

export default Posts;