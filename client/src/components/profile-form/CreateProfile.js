import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

let upload = false;

const CreateProfile = ({ createProfile, profile: { profile } }) => {
  const [formDatas, setFormData] = useState({
    location: '',
    bio: '',
  });

  const [image, setImage] = useState({});

  const navigate = useNavigate();

  const { bio, location } = formDatas;

  const onChange = (e) =>
    setFormData({ ...formDatas, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('location', location);
    formData.append('bio', bio);
    console.log(upload);
    if (upload === true) {
      formData.append('image', image, image.name);
    } else {
      formData.append('image', '../../uploads/defaultpicture.png');
    }
    createProfile(formData, navigate, profile ? true : false);
  };

  const changeImg = (e) => {
    upload = true;
    setImage(e.target.files[0]);
  };

  return (
    <div className='bg-img'>
      <div className='container'>
        <h1 className='large text-primary glory-b'>Create Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Let's get some information to make
          your profile stand out
        </p>

        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={onChange}
            />
            <small className='form-text'>
              City & state suggested (eg. Boston, MA)
            </small>
          </div>

          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={onChange}
            ></textarea>
            <small className='form-text'>Tell us a little about yourself</small>
          </div>

          <div className='form-group'>
            <input
              type='file'
              id='file'
              accept='image/png image/jpeg'
              class='my-1 btn btn-upload '
              onChange={changeImg}
            />
            <label for='file' class='bg-primary p-1 center center-click'>
              <i class='fa fa-hand-pointer-o' aria-hidden='true'></i>Upload your
              profile picture
            </label>

            <small className='form-text'>
              Will show on the side of your posts & comments
            </small>
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(CreateProfile);
