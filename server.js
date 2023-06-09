require('dotenv').config();
const path = require('path');

// Server (& method override)
const express = require('express');
const methodOverride = require('method-override');

// Database
const mongoose = require('mongoose');

// Express session & server store
const session = require('express-session');
const MongoDBStore = require('connect-mongo');

// ROUTE FILES
// Start server & load route files
const app = express();
const loginRoutes = require('./routes/loginRoutes');
const dashRoutes = require('./routes/dashboardRoutes');

// DATABASE
// Configure database
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Connect to database
const clientPromise = mongoose
  .connect(process.env.MONGODB_URI, dbOptions)
  .then((mongoose) => {
    console.log('Connected to database');
    return mongoose.connection.getClient();
  });

// Set up view engine and static rendering
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
// Middleware to use DELETE method
app.use(methodOverride('_method'));
// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));
// Session middleware
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

// Routes
// Login and logout
app.use('/', loginRoutes);
// Dashboard => add-info & create-resume
app.use('/dashboard', dashRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

// Start server
app.listen(process.env.PORT || 3500, '0.0.0.0', () => {
  console.log('Server started');
});
