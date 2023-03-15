import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  showBtn,
  post: {
    _id,
    title,
    ingredients,
    direction,
    image,
    userId,
    name,
    likes,
    comments,
    profileImg,
  },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${userId}`}>
        <img className='round-img' src={`../${profileImg}`} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div className='ingredients-direcions'>
      <span>
        <p className='large text-primary glory-b'>{title}</p>
        <img src={`../${image}`} alt='' className='final-photo fit-img' />
        <p className='my-1 large underline text-primary bg-dark2'>
          Ingredients
        </p>
        <div className='ingred'>
          {ingredients.map((ingred, index) => (
            <div key={index} className='p-1 text-left text-dark bg-dark'>
              <i className='fas fa-check text-primary'></i>
              {ingred}
            </div>
          ))}
        </div>
      </span>
      &nbsp;
      <p className='my-1 large underline text-primary bg-dark2'>Directions</p>
      <div className='direction'>
        {direction.map((direc, index) => (
          <div key={index} className='p-1 text-left text-dark bg-dark'>
            <i className='fa-solid fa-circle-dot text-primary '></i>
            {direc}
          </div>
        ))}
      </div>
      {showBtn && (
        <div className='btn-post'>
          <button
            onClick={(e) => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up'></i>
            <span>{likes.length}</span>
          </button>
          <button
            onClick={(e) => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down'></i>
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && userId === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

PostItem.defaultProps = {
  showBtn: true,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
