const express=require('express');
const dashboardRouter = express.Router();
const dashboardController = require('./dashboard.controller');

dashboardRouter.get('/',dashboardController.getDashboard);


module.exports = dashboardRouter
