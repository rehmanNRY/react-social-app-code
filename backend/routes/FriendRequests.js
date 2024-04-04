const express = require('express');
const router = express.Router();
const User = require("../models/Auth");
const fetchUser = require('../middleware/fetchUser');

// Send friend request
router.post('/sendRequest', fetchUser, async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    // Add receiverId to sender's sentRequests
    await User.findByIdAndUpdate(senderId, { $push: { sentRequests: receiverId } });

    // Add senderId to receiver's pendingRequests
    await User.findByIdAndUpdate(receiverId, { $push: { pendingRequests: senderId } });

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Accept friend request
router.put('/acceptRequest', fetchUser, async (req, res) => {
  try {
    const { senderId } = req.body;
    const receiverId = req.user.id;

    // Remove senderId from receiver's pendingRequests
    await User.findByIdAndUpdate(receiverId, { $pull: { pendingRequests: senderId } });

    // Add receiverId to sender's friends
    await User.findByIdAndUpdate(senderId, { $push: { friends: receiverId } });

    // Add senderId to receiver's friends
    await User.findByIdAndUpdate(receiverId, { $push: { friends: senderId } });

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete friend request
router.delete('/deleteRequest', fetchUser, async (req, res) => {
  try {
    const { senderId } = req.body;
    const receiverId = req.user.id;

    // Remove receiverId from sender's sentRequests
    await User.findByIdAndUpdate(senderId, { $pull: { sentRequests: receiverId } });

    // Remove senderId from receiver's pendingRequests
    await User.findByIdAndUpdate(receiverId, { $pull: { pendingRequests: senderId } });

    res.status(200).json({ message: "Friend request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Fetch all sent friend requests
router.get('/sentRequests', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('sentRequests', 'name profilePic');
    res.status(200).json(user.sentRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all received friend requests
router.get('/receivedRequests', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('pendingRequests', 'name profilePic');
    res.status(200).json(user.pendingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;