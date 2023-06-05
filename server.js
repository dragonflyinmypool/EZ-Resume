require('dotenv').config();

// Web server framework
const express = require('express');
// Database
const mongoose = require('mongoose');

// Session
const session = require('express-session');
// Session database
const MongoDBStore = require('connect-mongo');

const path = require('path');

const app = express();
const routes = require('./routes/index');

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const clientPromise = mongoose
  .connect(process.env.MONGODB_URI, dbOptions)
  .then((mongoose) => {
    console.log('Connected to database');
    return mongoose.connection.getClient();
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
    },
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});
