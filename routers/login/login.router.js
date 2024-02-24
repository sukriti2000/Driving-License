const express=require('express');
const loginRouter = express.Router();
const loginController = require('./login.controller');


loginRouter.get('/',loginController.getLogin);
loginRouter.post('/',loginController.httpCreateUser);
loginRouter.post('/auth',loginController.httpLoginAuth);

module.exports = loginRouter
