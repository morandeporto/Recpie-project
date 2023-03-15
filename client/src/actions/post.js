import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_USER_POSTS,
} from './types';

//get posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.respone.statusText, status: err.respone.status },
    });
  }
};

//update like

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.respone.statusText, status: err.respone.status },
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.respone.statusText, status: err.respone.status },
    });
  }
};

//delete post

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.respone.statusText, status: err.respone.status },
    });
  }
};

// create post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.respone.statusText, status: err.respone.status },
    });
  }
};

//get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.respone.statusText, status: err.respone.status },
    });
  }
};

// add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delte comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get user posts
export const getUserPosts = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/user/${id}`);

    dispatch({
      type: GET_USER_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.respone.statusText, status: err.respone.status },
    });
  }
};
