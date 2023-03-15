import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/posts'>
          <i className='fa-solid fa-kitchen-set'></i>
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/profiles'>
          <i className='fa-solid fa-users'></i>
          <span className='hide-sm'>Profiles</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fa-solid fa-user'></i>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='#!'>
          <i className='fa-solid fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fa-solid fa-users'></i>
          <span className='hide-sm'>Profiles</span>
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <i className='fa-solid fa-user-plus'></i>
          <span className='hide-sm'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fa-solid fa-right-to-bracket'></i>
          <span className='hide-sm'>Login</span>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-solid fa-bowl-rice'></i> RecipesNetwork
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
