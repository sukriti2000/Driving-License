const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  isTimeSlotAvailable: {
    type: Boolean,
    default: true,
  },
});

const appointmentModel = mongoose.model("Appointments", appointmentSchema);

module.exports = appointmentModel;
