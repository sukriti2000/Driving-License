const express=require('express');
const GPageRouter = express.Router();
const GPageController = require('./G_page.controller');

GPageRouter.get('/',GPageController.getGPage);
GPageRouter.post('/',GPageController.httpSaveDriverG);
GPageRouter.get('/getResult',GPageController.httpGetResult);


module.exports = GPageRouter
