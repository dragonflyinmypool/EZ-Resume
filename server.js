require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
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
    store: MongoDBStore.create({ clientPromise }),
    cookie: {
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
    },
  })
);

app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('Server started');
});
