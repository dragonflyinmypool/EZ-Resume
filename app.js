// Module imports
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const flash = require('connect-flash');

// Initialize Express app
const app = express();

// MongoDB connection string
const dbString =
  'mongodb+srv://jheiney10:YyQRfjBRVVXE0Fj7@nodetest.qj1nf8a.mongodb.net/?retryWrites=true&w=majority';

// MongoDB client options
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
const clientPromise = mongoose
  .connect(dbString, dbOptions)
  .then((mongoose) => mongoose.connection.getClient());

// Express app settings
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(flash());

// Session management
app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore.create({ clientPromise }),
  })
);

// Routing
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Start server
app.listen(3000, () => {
  console.log('App listening on port 3000');
});
