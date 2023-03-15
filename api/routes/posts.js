const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth.js');
const upload = require('../middlewares/upload');
const { check } = require('express-validator');

const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
  likePost,
  unlikePost,
  addComment,
  removeComment,
  getUserPost,
} = require('../controllers/posts');

//Public routes
router.get('/', getAllPosts);
router.get('/:id', getPost);
router.get('/user/:id', getUserPost);

//Privte routes
router.post('/', checkAuth, upload.single('image'), createPost);
router.post(
  '/comment/:id',
  checkAuth,
  check('text', 'Text is required').notEmpty(),
  addComment
);
router.patch('/:postId', checkAuth, updatePost);
router.patch('/like/:postId', checkAuth, likePost);
router.patch('/unlike/:postId', checkAuth, unlikePost);
router.delete('/:postId', checkAuth, deletePost);
router.delete('/comment/:id/:comment_id', checkAuth, removeComment);

module.exports = router;
