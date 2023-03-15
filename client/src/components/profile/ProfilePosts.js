import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../actions/post';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

const ProfilePosts = ({
  getUserPosts,
  post: { posts, loading },
  profile: {
    user: { _id },
  },
}) => {
  useEffect(() => {
    getUserPosts(_id);
  }, [getUserPosts, _id]);
  return loading ? (
    <Spinner />
  ) : posts.length === 0 ? (
    <div className=' large center-text'>Haven't posted a recipe yet</div>
  ) : (
    <div>
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

ProfilePosts.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getUserPosts })(ProfilePosts);
