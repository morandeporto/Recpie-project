const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const postsRoutes = require('./api/routes/posts');
const usersRoutes = require('./api/routes/users');
const profilesRoutes = require('./api/routes/profiles');
const path = require('path');

// connect MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@firstproject.s806d2l.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

process.on('warning', (e) => console.warn(e.stack));

mongoose.connection.on('connected', () => {
  console.log('MongoDB Conected...');
});

app.use(morgan('dev')); // throw logs for better management

app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requsted , Content-Type, Accept , Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT , POST , PATCH , DELETE, GET'
    );
    return res.status(200).json({});
  }
  next();
});

app.use(express.json()); // makeing req.body available
app.use(
  express.urlencoded({
    extended: false,
  })
);

//serve static assets

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('/**', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Routes
app.use(`/posts`, postsRoutes);
app.use(`/users`, usersRoutes);
app.use(`/profiles`, profilesRoutes);

// if route dosent exist
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
