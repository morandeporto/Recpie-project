const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  direction: { type: [String], required: true },
  image: { type: String },
  profileImg: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      name: { type: String },
      image: '',
    },
  ],
});

module.exports = mongoose.model('Post', postSchema);
