const appointmentDatabase = require("./appointment.mongo");

async function saveSlotsToDatabase({ date, slots }) {
  for (let slot of slots) {
    await appointmentDatabase.create({
      date: date,
      time: slot,
    });
  }
  return "success";
}


const getBookedSlotsByDate = async (date) => {
  const slots = await appointmentDatabase.find({
    date: date,
  });
  console.log("DB:", slots);
  return slots;
};

const updateSlotStatus = async (id, isAvailable) => {
  await appointmentDatabase.findByIdAndUpdate(
    { _id: id },
    {
      isTimeSlotAvailable: isAvailable,
    }
  );
};
module.exports = {
  getBookedSlotsByDate,
  saveSlotsToDatabase,
  updateSlotStatus,
};
