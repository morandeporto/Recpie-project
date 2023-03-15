import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name },
    bio,
    location,
    profileImage,
  },
}) => {
  return (
    <div className='profile bg-w center-item'>
      <img src={profileImage} alt='' className='round-img' />
      <div>
        <h2 className='text-primary glory-b'>{name}</h2>
        <p>{bio}</p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
