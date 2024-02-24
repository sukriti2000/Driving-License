const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default : null
  },
  lastName: {
    type: String,
    default : null
  },
  age: {
    type: Number,
    default : 0
  },
  dateOfBirth: {
    type: String,
    default : null
  },
  licenseNumber: {
    type: String,
    default : null
  },

   username:{
      type: String,
      required:true,
    },
    password : {
      type: String,
      required:true,
    },
    userType : {
      type: String,
      required:true,
    },
    
    car_details: {
    make: {
      type: String,
      default : null
    },
    model: {
      type: String,
      default : null
    },
    year: {
      type: Date,
      default : null
    },
    plateNumber: {
      type: String,
      default : null
    },
  },
  appointmentId: {
    default: "N/A",
    type: String,
  },
  TestType:{
    type: String,
    default : null
  },
  Result :{
    type : Boolean,
    default : null
  },
  Comment :{
    type: String,
    default : null
  }
});

  module.exports = mongoose.model('Driver',DriverSchema);