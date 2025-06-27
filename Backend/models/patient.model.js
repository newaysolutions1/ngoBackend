const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  disease: String,
},{ timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
