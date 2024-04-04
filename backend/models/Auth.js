const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: 'https://spellquiz.com/upload/file?d=user-avatars/avatar-14.png'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Auth' }],
  pendingRequests: [{ type: Schema.Types.ObjectId, ref: 'Auth' }],
  sentRequests: [{ type: Schema.Types.ObjectId, ref: 'Auth' }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("auth", authSchema);