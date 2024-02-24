const {
    saveSlotsToDatabase,
    getBookedSlotsByDate,
    updateSlotStatus,
  } = require("../../models/appointment.model");
  const { updateUserAppointment,getResult } = require("../../models/driver.model");
  
  const renderAppointmentPage = (req, res) => {
    return res.render("appointment")
  };
  
  const getBookedSlots = async (req, res) => {
    console.log("Select Date:", req.params.selectDate);
   
    const bookedSlots = await getBookedSlotsByDate(req.params.selectDate);
    return res.status(200).json(bookedSlots);
  };
  
  const postBookedSlots = async (req, res) => {
    console.log("Booked slots:", req.body);
    const result = await saveSlotsToDatabase(req.body);
    console.log("result:" + result);
    if (result === "success") {
      return res.sendStatus(201);
    } else {
      res.sendStatus(500);
    }
   
  };
  const putAppointmentIdIntoUser = async (req, res) => {
    console.log("appointment ID:", req.body);
  
    try {
      console.log('updateUserAppointment calling', req.cookies.username, req.body.appointmentId);
      await updateUserAppointment({
        userName: req.cookies.username,
        appointmentId: req.body.appointmentId,
      });
  
      console.log('updateUserAppointment called');
      await updateSlotStatus(req.body.appointmentId, false);
    } catch (e) {
      return res.sendStatus(500);
    }
    return res.sendStatus(201);
  };
  
  async function httpgetResult(req,res){
    const result = req.body;
    console.log('result',result);
    try {
      const filteredData = await getResult(result);
      console.log('data',filteredData);
      // if (!filteredData || filteredData.length === 0) {
      //   return res.status(404).json({
      //     err: 'no data found'
      //   });
      // }
     
      return res.status(200).json(filteredData);
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
    }
  module.exports = {
    putAppointmentIdIntoUser,
    renderAppointmentPage,
    postBookedSlots,
    getBookedSlots,
    httpgetResult
  };
  