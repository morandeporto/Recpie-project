const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.autorizition;
    jwt.verify(token, process.env.SECUREKEY, (error, decoded) => {
      if (error) throw error;
      req.user = decoded.user;
    });
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Auth failed',
    });
  }
};

module.exports = checkAuth;
