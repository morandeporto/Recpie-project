import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['autorizition'] = token;
  } else {
    delete axios.defaults.headers.common['autorizition'];
  }
};

export default setAuthToken;
