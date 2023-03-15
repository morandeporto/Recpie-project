import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    location,
    profileImage,
    user: { name },
  },
}) => {
  return (
    <div class='profile-top bg-primary'>
      <img className='round-img my-1' src={`../${profileImage}`} alt='' />
      <h1 class='large'>{name}</h1>
      <p>{location}</p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
