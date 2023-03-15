import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, image, user },
  auth,
  deleteComment,
}) => {
  return (
    <div className='comments bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={`../${image}`} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(postId, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
