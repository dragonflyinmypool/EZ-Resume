const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    description: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  email: String,
  token: String,
  expires: Date,
  jobs: [jobSchema],
});

module.exports = mongoose.model('User', userSchema);
