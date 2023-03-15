const mongoose = require('mongoose');
const { Post } = require('../models/post');

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bio: { type: String },
  location: { type: String },
  profileImage: { type: String },
  posts: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('Profile', profileSchema);
