const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  user_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  likes: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    liker_name:{
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    user_name:{
      type: String
    },
    description:{
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  bookmarkedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model("post", postSchema);