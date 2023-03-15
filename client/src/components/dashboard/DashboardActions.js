import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
      <Link to='/edit-profile' className='btn btn-dark dash-buttons'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='/posts' className='btn btn-dark dash-buttons'>
        <i className='fa-solid fa-kitchen-set text-primary'></i> Browse Posts
      </Link>
    </div>
  );
};

export default DashboardActions;
