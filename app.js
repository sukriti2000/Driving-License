const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout= require('express-ejs-layouts');
const path = require('path');


//importing for authentication 
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const morgan = require("morgan");

const dashboardRouter = require('./routers/dashboard/dashboard.router');
const GPageRouter = require('./routers/G_page/G_page.router');
const G2PageRouter = require('./routers/G2_page/G2_page.router');
const loginRouter = require('./routers/login/login.router');
const examinerRouter = require('./routers/examiner/examiner.router');
const appointmentRouter = require('./routers/appointment/appointment.router');

// Settings for rendering HTML and CSS'
app.use(expressLayout);
app.set('view engine', 'ejs'); // Setting EJS as the view engine
app.set('layout','./layouts/index')

// bodyParser to parse form values 
app.use(bodyParser.urlencoded({extended:true}));

// //keep track of cookies - cookie middleware
app.use(cookieParser());

// //session middleware for sessions
// app.use(
//     session({
//         key : 'user_id',
//         secret : 'node app',
//         resave : false,
//         saveUninitialized :true,
//         cookie:{
//             expires : 600000
//         }
//     })
// );

// Importing routes

console.log('app.js page');


app.set('views', path.join(__dirname, 'views')); // Setting the directory for HTML pages
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files from the 'public' directory
app.use(express.json());//middleware for json body parsing

//assiging routers
app.use('/dashboard', dashboardRouter);
app.use('/G',GPageRouter);
app.use('/G2',G2PageRouter);
app.use('/login',loginRouter);
app.use('/appointment', appointmentRouter);
app.use('/examiner',examinerRouter);


app.use('/*',(req,res)=>{
    res.redirect('login');
})



module.exports=app