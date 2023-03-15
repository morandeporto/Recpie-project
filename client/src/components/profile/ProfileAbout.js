import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    user: { name },
  },
}) => (
  <div class='profile-about bg-light p-2'>
    <h2 class='text-primary'>{name.split(' ')[0]}'s bio</h2>
    <p>{bio}</p>
    &nbsp;
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
