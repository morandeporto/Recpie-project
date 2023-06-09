import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate replace={true} to='/dashboard' />;
  }

  return (
    <div className='bg-img'>
      <section className='container'>
        <h1 className='large text-primary glory-b'>Sing In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sing Into Your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <input type='submit' value='Login' className='btn btn-primary' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sing Up</Link>
        </p>
      </section>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
