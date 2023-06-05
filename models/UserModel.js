const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  description: String,
});

const basicInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  email: String,
  token: String,
  expires: Date,
  jobs: [sectionSchema],
  skills: [sectionSchema],
  education: [sectionSchema],
  basicInfo: { type: basicInfoSchema, default: () => ({}) },
});

module.exports = mongoose.model('User', userSchema);
