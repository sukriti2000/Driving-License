const API_URL = "http://localhost:3000";

//for G2 page
function getUserDataG2() {
  //personal details
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const licenseNumber = document.getElementById("licenseNumber").value;
  const age = document.getElementById("age").value;
  const dateOfBirth = document.getElementById("dob").value;

  //car details

  const make = document.getElementById("carMake").value;
  const model = document.getElementById("carModel").value;
  const year = document.getElementById("carYear").value;
  const plateNumber = document.getElementById("plateNumber").value;

  const car_details = {
    make: make,
    model: model,
    year: year,
    plateNumber: plateNumber,
  };

  const PersonInfo = {
    firstName: firstName,
    lastName: lastName,
    licenseNumber: licenseNumber,
    age: age,
    dateOfBirth: dateOfBirth,
    car_details: car_details,
    TestType : 'G2'
  };

  return PersonInfo;
}

async function postPersonInfoG2() {
  const PersonInfo = await getUserDataG2();

  const response = await fetch(`${API_URL}/G2`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(PersonInfo),
  });

  if (response.ok) {
    const data = await response.text();
    console.log(data + "reponse is ok"); // Process the data received from the server
  } else {
    console.log("Failed to save the person." + response.json());
  }
}

const formSubmit = document.getElementById("post-form");

if (formSubmit) {
  formSubmit.addEventListener("submit", (evt) => {
    evt.preventDefault();
    postPersonInfoG2();
  });
}
//for G2 page



//For login page
function newUserData() {
  const form_username = document.getElementById("userName").value;
  const form_password = document.getElementById("password").value;
  const form_userType = document.getElementById("userType").value;

  const form_login_details = {
    username: form_username,
    password: form_password,
    userType: form_userType,
  };
  return form_login_details;
}

async function SignUp() {
  const user_details = await newUserData();
  console.log(user_details + "user data from login user");
  const response = await fetch(`${API_URL}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_details),
  });

  if (response.ok) {
    const data = await response.text();
    console.log(data + "reponse is ok"); // Process the data received from the server
    $("#signupForm").css("display", "none");
    $("#loginForm").css("display", "block");
    $("#Log-in-heading").html("<h1>LOG-IN</h1>");
  } else {
    console.log("Failed to save the person." + response.json());
  }
}



async function LoginUser() {
  console.log("in login user");
  const loginUsername = document.getElementById("loginUserName").value;
  const loginPassword = document.getElementById("checkPassword").value;

  console.log("loginUsername", loginUsername);
  console.log("loginPassword", loginPassword);

  const logindetails = {
    username: loginUsername,
    password: loginPassword,
  };
  console.log("LoginAuth  called ");
  const response = await fetch(`${API_URL}/login/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logindetails),
  });
  if (response.ok) {
    await checkUserStatus();

    window.location.replace("http://localhost:3000/dashboard");
  } else {
    console.log("unsuccessfull to login." + response.json());
  }

  console.log("response", response);
}

function checkUserStatus() {
  const cookies = document.cookie.split(";");
  let userType = null;
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [name, value] = cookie.split("=");
    if(name == "userType"){
      userType = 1;
    }
    if (name === "userType" && value === "Driver") {
      // Show the links for the driver
      document.getElementById("Glink").style.display = "block";
      document.getElementById("G2-link").style.display = "block";
      document.getElementById("logout-link").style.display = "block";
      document.getElementById("Login-Link").style.display = "none";
      document.getElementById("appointment-link").style.display = "none";
      document.getElementById("Examiner-link").style.display = "none";
    } else if (name === "userType" && value === "Admin") {
      // Show the link for the admin
      document.getElementById("appointment-link").style.display = "block";
      document.getElementById("Glink").style.display = "none";
      document.getElementById("G2-link").style.display = "none";
      document.getElementById("logout-link").style.display = "block";
      document.getElementById("Login-Link").style.display = "none";
      document.getElementById("Examiner-link").style.display = "none";

    } else if (name === "userType" && value === "Examiner") {
      // Show the link for the Examiner
      document.getElementById("appointment-link").style.display = "none";
      document.getElementById("Glink").style.display = "none";
      document.getElementById("G2-link").style.display = "none";
      document.getElementById("logout-link").style.display = "block";
      document.getElementById("Login-Link").style.display = "none";
      document.getElementById("Examiner-link").style.display = "block";
    } 
  }
  if(userType === null){
    
      document.getElementById("Glink").style.display = "none";
      document.getElementById("G2-link").style.display = "none";
      document.getElementById("logout-link").style.display = "none";
      document.getElementById("Login-Link").style.display = "block";
      document.getElementById("appointment-link").style.display = "none";
      document.getElementById("Examiner-link").style.display = "none";
  }
 
}

document.addEventListener("DOMContentLoaded", () => {
  checkUserStatus();

});

//for login page