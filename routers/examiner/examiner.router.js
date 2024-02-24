const express=require('express');
const examinerRouter = express.Router();
const examinerController = require('./examiner.controller');


examinerRouter.get('/',examinerController.getExaminer);
examinerRouter.post('/filtered',examinerController.httpsFilterSelection);
examinerRouter.post('/UploadResult',examinerController.httpUploadResult);

module.exports = examinerRouter
