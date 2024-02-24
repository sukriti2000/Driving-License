const express=require('express');
const G2PageRouter = express.Router();
const G2PageController = require('./G2_page.controller');

G2PageRouter.get('/',G2PageController.getG2Page);
G2PageRouter.post('/',G2PageController.httpSaveDriver);
G2PageRouter.get('/getResult',G2PageController.httpGetResult);

module.exports = G2PageRouter
