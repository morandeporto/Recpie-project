const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth.js');
const upload = require('../middlewares/upload');
const { check } = require('express-validator');

const {
  getOwnProfile,
  createProfile,
  getAllProfiles,
  getProfile,
  deleteProfile,
  editProfile,
} = require('../controllers/profiles');

//Public routes
router.get('/', getAllProfiles);
router.get('/user/:user_id', getProfile);

//Privte routes
router.get('/me', checkAuth, getOwnProfile);
router.post('/', checkAuth, upload.single('image'), createProfile);
router.post('/edit', checkAuth, editProfile);
router.delete('/', checkAuth, deleteProfile);

module.exports = router;
