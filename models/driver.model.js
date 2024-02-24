const driverDatabase = require("./driver.mongo");

// crypto to encrypt and decrypt licenseNumber
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = 'your-secret-key';

const bcrypt = require("bcrypt");
const saltRounds = 8;

function ValidateDriver(driver) {
  console.log("Validate");
  if (driver.firstName.trim() === "") {
    return false;
  }
  if (driver.lastName.trim() === "") {
    return false;
  }
  if (isNaN(driver.age)) {
    return false;
  }
  if (driver.licenseNumber.trim() === "") {
    return false;
  }
  if (driver.dateOfBirth.trim() === "") {
    return false;
  }
  if (driver.car_details.make.trim() === "") {
    return false;
  }
  if (driver.car_details.model.trim() === "") {
    return false;
  }
  if (driver.car_details.year === null || isNaN(new Date(driver.car_details.year))) {
    return false;
  }
  if (driver.car_details.plateNumber.trim() === "") {
    return false;
  }
  return true;
}

// Function to encrypt data
function encrypt(text) {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Function to decrypt data
function decrypt(encryptedText) {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

async function saveDriver(username,driver) {
  const encryptedLicense = encrypt(driver.licenseNumber);
  await driverDatabase.updateOne({
    username : username
  },
  {
    firstName: driver.firstName,
    lastName: driver.lastName,
    age: Number(driver.age),
    licenseNumber: encryptedLicense,
    dateOfBirth: driver.dateOfBirth,
    car_details: {
      make: driver.car_details.make,
      model: driver.car_details.model,
      year: driver.car_details.year,
      plateNumber: driver.car_details.plateNumber,
    },
    TestType : driver.TestType
  });
  console.log(`User saved ${driver.firstName}`);
}

async function getDriverInfoByUsername(username){
   console.log("username from display=");
  const res = await driverDatabase.findOne({
    username : username
  })
  console.log(res.username);
  if(res.car_details.year!=null)
    res.car_details.year =new Date(res.car_details.year).getUTCFullYear();
  if(res.licenseNumber!=null)
    res.licenseNumber = decrypt(res.licenseNumber);
  return res;
}


async function CreateUser(user){
  console.log('createUser called');
  console.log(user.username+" yo details");

  try {
    checkUser = await driverDatabase.findOne({ username: user.username });
    if (checkUser) {
      return { message: "User Name already Exist" };
    }
    // const hash = await bcrypt.hash(user.password, saltRounds);
    const newUser = new driverDatabase();
    const hashpass = await bcrypt.hash(user.password, saltRounds);
    console.log(hashpass);
    newUser.username = user.username;
    newUser.password = hashpass;
    newUser.userType = user.userType;
    const result = await newUser.save();
    return { status: true, message: "User Insert Successfully", user: result };
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

function validateLoginInfo(user_details){
  if (user_details.username.trim() === "") {
    return false;
  }
  if(user_details.password.trim() === ""){
    return false;
  }
  if(user_details.userType.trim() === ""){
    return false;
  }
  return true;
}

async function LoginAuth(login_details) {
  console.log("login details"+login_details.username);
  const user = await driverDatabase.findOne({ username: login_details.username });
  // console.log("in login auth main func"+ user);
  
  if (!user) {
    console.log('no user found');
    return false;
  } else {
    
    const hashcheck = await bcrypt.compare(login_details.password, user.password);
    console.log(hashcheck);
    const result ={
      username : user.username,
      userType : user.userType,
      success : true
    }
    if(hashcheck) return result;

    else  return hashcheck;
   
  }
}
const updateUserAppointment = async ({ userName, appointmentId }) => {

  const stringAppointmentId = appointmentId.toString();
  const result = await driverDatabase.findOneAndUpdate(
    { username : userName },
    {
      appointmentId: stringAppointmentId,
    }
  );
  console.log("here in update user app",userName,appointmentId); 
  console.log("result:", result);
};


async function getResultByUsername(username,type){
  const result = await driverDatabase.findOne({
     username: username, 
     TestType: type
    });
  return result;
}

async function getFilteredAppointments(data){
  try {
    let result = null;
    if(data.TestType == 'All'){
       result = await driverDatabase.find({
        userType : 'Driver',
        appointmentId: { $ne: "N/A" }
       });

    }
    else {
      result = await driverDatabase.find({
        userType : 'Driver',
          TestType: data.TestType,
          appointmentId: { $ne: "N/A" }
      });
    }
       // Move the following lines inside the condition blocks
       for (const res of result) {
        if (res.car_details.year != null) {
          res.car_details.year = new Date(res.car_details.year).getUTCFullYear();
        }
        if (res.licenseNumber != null) {
          res.licenseNumber = decrypt(res.licenseNumber);
        }
      }
    return result;
} catch (error) {
    console.error('Error in getFilteredAppointments:', error);
    throw error; // Rethrow the error to handle it further up the call stack
}
}

async function uploadResult(uploadObject) {
  try {
    const result = await driverDatabase.findOneAndUpdate(
      { _id: uploadObject.id },
      { $set: { Result: uploadObject.result, Comment: uploadObject.feedback } },
      { new: true } // This option returns the updated document
    );
    
    if (result) {
      console.log("Updated document:", result);
      // Perform any other actions you need
      return true
    } else {
      console.log("Document not found for update.");
      return false;
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return false;
  }
}

async function getResult(ResultType){
  try{
    const result = await driverDatabase.find({
        userType : 'Driver',
        Result : ResultType.Result
       
    })
    console.log('result inner function',result);
     
  return result;
} catch (error) {
  console.error('Error in getting result:', error);
  throw error; // Rethrow the error to handle it further up the call stack
}
}
  

module.exports = {
  ValidateDriver,
  saveDriver,
  getDriverInfoByUsername,
  updateUserAppointment,
  CreateUser,
  validateLoginInfo,
  LoginAuth,
  getResult,
  getFilteredAppointments,
  uploadResult,
  getResultByUsername
};
