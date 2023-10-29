const express = require('express');
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/Auth");
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');

// Route 1: Making new post using POST "/api/post/" : Login require
router.post('/newpost', fetchUser, [
   body('description', 'Post should not be empty').exists()
], async (req, res) => {
   // Return bad request if there are errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const userId = req.user.id;
      const user_name = await User.findById(userId).select("name");
      let post = await Post.create({
         user: userId,
         description: req.body.description,
         likes: [],
         user_name: user_name.name,
         date: new Date(),
      })
      const savedPost = await post.save();
      res.json(savedPost);
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
   }
});

// Route 2: Fetch all posts using GET "/api/post/" : No Login require
router.get('/allposts', async (req, res) => {
   try {
      const posts = await Post.find().select();
      res.json(posts);
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
   }
});

// Route 3: Delete posts using DELETE "/api/post/" : Login require
router.delete('/deletepost/', fetchUser, async (req, res) => {
   try {
      const userId = req.user.id;
      const postId = req.body.id;
      const post = await Post.findById(postId).select('user');
      // console.log(userId, post.user.id)
      if (!post) {
         // Post not found, return an error response
         return res.status(404).json({ error: "Post not found" });
      }
      if (userId === post.user.toString()) {
         const deletedPost = await Post.findByIdAndDelete(postId);
         if (deletedPost) {
            res.json({ success: "Post deleted successfully" });
         } else {
            res.status(500).json({ error: "Internal server error" });
         }
      } else {
         res.status(400).json({ error: "Not allowed" });
      }
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
   }
});

// Route 4: Like and dislike a post using POST "/api/post/like/:postId" : Login require
router.post('/like', fetchUser, async (req, res) => {
   try {
      const userId = req.user.id;
      const postId = req.body.id;
      const user_name = await User.findById(userId).select("name");
      // Check is the post exist or not
      const post = await Post.findById(postId);
      if (!post) {
         return res.status(404).json({ error: "Post not found" });
      }
      // Find the index of the like entry for the current user
      const likeIndex = post.likes.findIndex(like => like.user_id.toString() === userId);
      // Now like or dislike the post
      if (likeIndex !== -1) {
         // Remove user's ID and name from 'likes' array in post
         post.likes.splice(likeIndex, 1);
         // post.likes = post.likes.filter((id) => id.toString() !== userId);
         await post.save();
         res.json({ dislike: "Post dis-liked successfully" });
      } else {
         // Add user's ID and name in 'likes' array of post
         // const user_name = user_name.name;
         post.likes.push({ user_id: userId, liker_name: user_name.name });
         await post.save();
         res.json({ like: "Post liked successfully" });
      }
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
   }
});

// Route 5: Comment on a post using POST "/api/post/comment" : Login require
router.post('/comment', fetchUser, async (req, res) => {
   try {
      const userId = req.user.id;
      const user_name = await User.findById(userId).select("name");
      const postId = req.body.postId;
      const description = req.body.description;
      // Check is the post exist or not
      const post = await Post.findById(postId);
      if (!post) {
         return res.status(404).json({ error: "Post not found" });
      }
      let newComment = {
         user_id: userId,
         user_name: user_name.name,
         description
      };
      post.comments.push(newComment);
      await post.save();
      res.json({ success: "Comment successfully", comment: post.comments[post.comments.length - 1] });
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
   }
});

// Route 6: Delete a comment using DELETE "/api/post/comment/:commentId" and ensure ownership
router.delete('/comment/', fetchUser, async (req, res) => {
   try {
      const userId = req.user.id;
      const commentId = req.body.commentId;
      // Find the post that contains the comment
      const post = await Post.findOne({ 'comments._id': commentId });
      if (!post) {
         return res.status(404).json({ error: "Comment not found" });
      }
      // Find the index of the comment
      const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
      if (commentIndex === -1) {
         return res.status(404).json({ error: "Comment not found" });
      }
      // Ensure that the user requesting the deletion is the owner of the comment
      if (post.comments[commentIndex].user_id.toString() === userId) {
         // Remove the comment
         post.comments.splice(commentIndex, 1);
         await post.save();
         res.json({ success: "Comment deleted successfully" });
      } else {
         res.status(400).json({ error: "Not allowed to delete this comment" });
      }
   } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
   }
});

// Route 7: Bookmark a post using POST "/api/post/bookmark/" : Login required
router.post('/bookmark/', fetchUser, async (req, res) => {
   try {
      const userId = req.user.id;
      const postId = req.body.postId;
      // Check if the post exists
      const post = await Post.findById(postId);
      if (!post) {
         return res.status(404).json({ error: "Post not found" });
      }
      // Check if the user has already bookmarked the post
      const isBookmarked = post.bookmarkedBy.includes(userId);
      if (isBookmarked) {
         // If already bookmarked, remove it from the bookmark list
         const bookmarkIndex = post.bookmarkedBy.indexOf(userId);
         post.bookmarkedBy.splice(bookmarkIndex, 1);
         await post.save();
         res.json({ success: "Post removed from bookmark list" });
      } else {
         // If not bookmarked, add it to the bookmark list
         post.bookmarkedBy.push(userId);
         await post.save();
         res.json({ success: "Post bookmarked successfully" });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
});

// Route 8: Get all posts bookmarked by any user using GET "/api/post/bookmarked" : Login required
router.get('/bookmarked', fetchUser, async (req, res) => {
   try {
      const userId = req.user.id;
      // Find all posts that have been bookmarked by the user
      const bookmarkedPosts = await Post.find({ bookmarkedBy: userId }).select("-bookmarkedBy");
      res.json(bookmarkedPosts);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
});


module.exports = router;