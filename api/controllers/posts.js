const { json } = require('express');
const { mongoose } = require('mongoose');
const { restart } = require('nodemon');
const Post = require('../models/post');
const User = require('../models/user');
const Profile = require('../models/profile');
const { validationResult } = require('express-validator');

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getPost: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findOne({ _id: postId });
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  },

  getUserPost: async (req, res) => {
    try {
      const userId = req.params.id;
      let posts = await Post.find({
        userId: {
          $in: userId,
        },
      });

      if (!posts) {
        return res.status(404).json({ msg: 'User didnt post yet' });
      }
      res.json(posts);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  },

  createPost: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { path: image } = req.file;
      const { title, ingredients, direction } = req.body;
      const user = await User.findById(req.user.id).select('-password');
      const profile = await Profile.findOne({ user: req.user.id });

      if (!user) {
        return res.status(500).json({
          msg: 'Please login first',
        });
      }

      if (!profile) {
        return res.status(500).json({
          msg: 'Please create a porfile first',
        });
      }

      console.log(profile);
      const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title,
        ingredients: ingredients.split(',').map((s) => s.trim()),
        direction: direction.split(',').map((s) => s.trim()),
        image,
        name: user.name,
        userId: user.id,
        profileImg: profile.profileImage,
      });
      const newPost = await post.save();
      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  updatePost: (req, res) => {
    const postId = req.params.postId;
    Post.findById(postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            message: 'Post not found',
          });
        }
      })
      .then(() => {
        Post.updateOne({ _id: postId }, req.body)
          .then(() => {
            res.status(200).json({
              message: 'Post updated',
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
  },

  deletePost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      if (post.userId.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      await post.remove();

      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  },

  likePost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);

      if (
        post.likes.filter((like) => like.user?.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({
          msg: 'Post already liked',
        });
      }
      post.likes.unshift({ user: req.user.id });
      await post.save();
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  unlikePost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);

      if (
        post.likes.filter((like) => like.user?.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({
          msg: 'Post has not yet been liked',
        });
      }

      const removeIndex = post.likes
        .map((like) => like.user?.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  addComment: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const profile = await Profile.findOne({ user: req.user.id });

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        image: profile.profileImage,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  removeComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      if (!comment)
        return res.status(404).json({ message: 'Comment does not exists' });

      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not autorized' });
      }
      const removeIndex = post.comments
        .map((comment) => comment.user?.toString())
        .indexOf(req.user.id);

      post.comments.splice(removeIndex, 1);

      await post.save();
      res.json(post.comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
