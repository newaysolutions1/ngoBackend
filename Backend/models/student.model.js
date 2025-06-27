const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  institution: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: false,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  performanceScore: {
    type: String,
    required: true,
    trim: true
  },
  support: {
    type: [String],
    required: false
  },
  challange: {
    type: String,
    required: false,
    trim: true
  },
  goal: {
    type: String,
    required: false,
    trim: true
  },
  communicationMode: {
    type: [String],
    required: false
  },
  resume: {
    type: String,
    required: false,
    trim: true
  },
  identity: {
    type: String,
    required: false,
    trim: true
  },
  certificate: {
    type: String,
    required: false,
    trim: true
  },
  image: {
    type: String,
    required: false,
    trim: true
  },
  video: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });


module.exports = mongoose.model('Student', studentSchema);
