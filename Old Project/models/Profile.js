const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  job_history: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Profile', UserSchema);
