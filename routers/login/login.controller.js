const {CreateUser,validateLoginInfo,LoginAuth} = require('../../models/driver.model');

function getLogin(req,res){

    res.render('login');
}

async function httpLoginAuth(req,res){
    const response = req.body;
    console.log('in login authentication');
    const authResult = await LoginAuth(response);
    if(authResult.success){
        console.log(authResult.username+" "+authResult.userType);
        res.cookie('username',authResult.username, { maxAge: 60 * 60 * 24 } );
        res.cookie('userType',authResult.userType, { maxAge: 60 * 60 * 24 });
        console.log('login auth result is success');
      
        return res.status(200).send();
       
    }
    else{
        console.log('http login auth failed');
       
    }
}

async function httpCreateUser(req,res){
    const user_details = req.body;
    console.log(user_details+"in create user");
    console.log(validateLoginInfo(user_details));
    if(!validateLoginInfo(user_details)){
        return res.status(400).json({
            err : "Invalid Driver Entry"
        })
    }
    else{
        await CreateUser(user_details);
        return res.status(201).send();
    }
}
module.exports={
    getLogin,
    httpCreateUser,
    httpLoginAuth
};