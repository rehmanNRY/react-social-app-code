import React, { useEffect, useState } from 'react';
import Post from './Post';
import "./posts.css";
import userDetailApi from '../functions/user/userDetailApi';
import deletePostApi from '../functions/post/deletePostApi';
import publishPostApi from '../functions/post/publishPostApi';
import fetchPostsApi from '../functions/post/fetchPostsApi';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [post_desc, setPost_desc] = useState("")
  const [user_name, setUser_name] = useState("")
  useEffect(() => {
    // Getting user detai;
    const userDetail = async ()=>{
      const user = await userDetailApi();
      setUser_name(user.name);
    }
    userDetail();
    // Fetching posts
    const fetchData = async () => {
      await fetchPosts();
    };
    fetchData();
  }, []);
  const fetchPosts = async () => {
    try {
      const json = await fetchPostsApi();
      setPosts(json)
    } catch (error) {
      console.log("Some error occured")
    }
  }
  // Post description on change
  const post_descChng = (e) => {
    setPost_desc(e.target.value)
  }
  // New post api call
  const publishPost = async (description) => {
    try {
      const json = await publishPostApi(description);
      // Updating post in ui
      setPosts([json, ...posts ]);
      // Setting New post description to blank
      setPost_desc("");
    } catch (error) {
      console.log("Some error occured");
    }
  }
  // Making new post
  const newPost = (e) => {
    e.preventDefault();
    publishPost(post_desc);
  }
  // Delete Post
  const deletePost = async (id) => {
    try {
      const json = await deletePostApi(id);
      // Update posts in UI
      if(json.success){
        setPosts([...posts, json]);
        // Deleting from UI
        const newPosts = posts.filter((post) => { return post._id !== id });
        setPosts(newPosts);
      }else{
        console.log("Some error occured", json)
      }
    } catch (error) {
      console.log("Some error occured")
    }
  }
  return (
    <div className='posts_main'>
      <form className="posts-new_post" autoComplete='off' onSubmit={newPost}>
        <div className='posts-new_post-top'>
          <div></div>
          <input type="text" value={post_desc} name="post_desc" required onChange={post_descChng} placeholder={`What's in your mind today, ${user_name || "user"}?`} />
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
      {posts.length === 0 && <h3 className='noPostText'>No posts to show</h3>}
      {posts.map((post) => {
        return <Post key={post._id}  post={post} deletePost={deletePost} />;
      })}
    </div>
  )
}

export default Posts