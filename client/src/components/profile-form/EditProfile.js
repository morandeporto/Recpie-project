import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  editProfile,
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      bio: loading || !profile.bio ? '' : profile.bio,
      location: loading || !profile.location ? '' : profile.location,
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  const navigate = useNavigate();

  const { bio, location } = formData;

  const onChange = (e) =>
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(formData, navigate, profile ? true : false);
  };

  return (
    <div className='bg-img'>
      <div className='container'>
        <h1 className='large text-primary glory-b'>Edit Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Change your bio / location
        </p>

        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small className='form-text'>
              City & state suggested (eg. Tel Aviv, IL)
            </small>
          </div>

          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small className='form-text'>Tell us a little about yourself</small>
          </div>

          <input
            type='submit'
            value='Submit'
            className='btn btn-primary my-1'
          />
          <a className='btn btn-dark my-1' href='/dashboard'>
            Go Back
          </a>
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  EditProfile
);
