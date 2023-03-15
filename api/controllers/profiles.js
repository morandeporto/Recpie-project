const Post = require('../models/post');
const User = require('../models/user');
const Profile = require('../models/profile');
const { validationResult } = require('express-validator');

module.exports = {
  getOwnProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile)
        return res.status(400).json({
          msg: 'There is no profile for this user',
        });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  createProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const profileFields = {};

    if (typeof req.file !== 'undefined') {
      const { path: profileImage } = req.file;
      profileFields.profileImage = profileImage;
    } else {
      profileFields.profileImage = '../../uploads/defaultpicture.png';
    }
    const { bio, location } = req.body;

    profileFields.user = req.user.id;
    if (bio !== 'undefined') {
      profileFields.bio = bio;
    } else {
      profileFields.bio = 'No bio attached';
    }
    if (location !== 'undefined') {
      profileFields.location = location;
    } else {
      profileFields.location = 'No location attached';
    }

    let posts = await Post.find();

    posts = posts.filter((post) => post.userId.toString() === req.user.id);
    if (posts.length > 0) profileFields.posts = posts;

    try {
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  editProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const profileFields = {};

    const { bio, location } = req.body;

    if (bio !== 'undefined' && bio !== '') {
      profileFields.bio = bio;
    } else {
      profileFields.bio = 'No bio attached';
    }
    if (location !== 'undefined' && bio !== '') {
      profileFields.location = location;
    } else {
      profileFields.location = 'No location attached';
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res.status(400).json({
          msg: 'There is no profile for this user',
        });
      }
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  },

  getAllProfiles: async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name']);
      res.json(profiles);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate('user', ['name']);
      if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' });
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      await Promise.all([
        Post.deleteMany({ user: req.user.id }),
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id }),
      ]);

      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    res.json({ msg: 'User deleted' });
  },
};
