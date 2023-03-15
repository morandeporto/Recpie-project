import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [image, setImage] = useState({});
  const [formDatas, setFormData] = useState({
    title: '',
    ingredients: '',
    direction: '',
  });
  const { title, ingredients, direction } = formDatas;

  const changeImg = (e) => {
    setImage(e.target.files[0]);
  };

  const onChange = (e) =>
    setFormData({ ...formDatas, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('direction', direction);
    formData.append('image', image, image.name);
    addPost(formData);
    setFormData({
      title: '',
      ingredients: '',
      direction: '',
    });
    setImage('');
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p-1 center'>
        <h3>Share your recpie</h3>
      </div>
      <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
        <textarea
          name='title'
          value={title}
          cols='30'
          rows='2'
          onChange={onChange}
          placeholder='Title (The name of the food)'
          required
        ></textarea>
        <textarea
          name='ingredients'
          value={ingredients}
          cols='30'
          rows='5'
          onChange={onChange}
          placeholder='Ingredients (please enter your ingredients one by one, separated with , - example: 2 eggs,3 gram salt,1 onion)'
          required
        ></textarea>
        <textarea
          name='direction'
          value={direction}
          cols='30'
          rows='5'
          onChange={onChange}
          placeholder=' (please enter your  one by one, separated with `,` - example: mix the eggs,add the salt,fry for 5 min)'
          required
        ></textarea>
        <input
          type='file'
          id='file'
          onChange={changeImg}
          accept='image/png image/jpeg'
          className='my-1 btn btn-upload '
          required
        />
        &nbsp;
        <label htmlFor='file' className='bg-primary p-1 center center-click'>
          <i className='fa fa-hand-pointer-o' aria-hidden='true'></i>Upload
          final project photo
        </label>
        <input
          type='submit'
          className='btn btn-dark my-1 center'
          value='Submit'
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
