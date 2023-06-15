const mongoose = require('mongoose');

// Job Schema
const jobSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  jobDescription: String,
});

// Education Schema
const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
});

// Basic Info Schema
const basicInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
  },
  { _id: false }
);

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  token: String,
  expires: Date,
  jobs: [jobSchema],
  skills: [{ type: String }],
  education: [educationSchema],
  basicInfo: { type: basicInfoSchema, default: () => ({}) },
});

module.exports = mongoose.model('User', userSchema);
