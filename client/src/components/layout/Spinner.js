import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '100px',
        marginRight: 'auto',
        marginLeft: 'auto',

        marginTop: '6rem',
        display: 'grid',
      }}
      alt='Loading...'
    />
  </Fragment>
);

export default Spinner;
