const express = require("express");

const appointmentController = require("./appointment.controller");

const appointmentRouter = express.Router();

appointmentRouter.get("/", appointmentController.renderAppointmentPage);
appointmentRouter.get("/:selectDate", appointmentController.getBookedSlots);
appointmentRouter.post("/", appointmentController.postBookedSlots);
appointmentRouter.put("/", appointmentController.putAppointmentIdIntoUser);
appointmentRouter.post('/getResult',appointmentController.httpgetResult);

module.exports = appointmentRouter;
