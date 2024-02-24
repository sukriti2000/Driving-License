function getUserDataG(){

const G_firstName = document.getElementById('getfirstName').value;
const G_lastName = document.getElementById('getlastName').value;
const G_licenseNumber = document.getElementById('getlicenseNumber').value;
const G_age = document.getElementById('getage').value;
const G_dateOfBirth = document.getElementById('getdob').value;

//car details

const G_make= document.getElementById('getcarMake').value;
const G_model= document.getElementById('getcarModel').value;
const G_year = document.getElementById('getcarYear').value;
const G_plateNumber= document.getElementById('getplateNumber').value;


const person_info ={
    firstName : G_firstName,
    lastName : G_lastName,
    licenseNumber : G_licenseNumber,
    age : G_age,
    dateOfBirth : G_dateOfBirth,

    car_details :{
        make : G_make,
        model : G_model,
        year : G_year,
        plateNumber : G_plateNumber
    },
    TestType : 'G'
}
  return person_info;
}
const getForm = document.getElementById('G-page-form')

//get
if(getForm){
    getForm.addEventListener('submit',(evt)=>{

        evt.preventDefault();
       
        if(validateFormData());
             postPersonInfoG();
    })
}


async function postPersonInfoG() {
  const PersonInfo = await getUserDataG();

  const response = await fetch(`${API_URL}/G`, {
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



 function validateFormData() {
    console.log("Validate");
    const driver =  getUserDataG();
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
  
   // Result Section
   async function showResult() {
    console.log('Result button clicked');
    const response = await fetch(`${API_URL}/G/getResult`, {
      method: "GET", // "Get" should be "GET" (uppercase)
    });
  
    if (response.ok) {
      const report = await response.json(); // Parse response as JSON
      if (report.Result != null && report.Comment != null) {
        document.getElementById('Result-display').style.display = 'block';
        if(report.Result==true)
            document.getElementById('result-id').value = 'Pass';
        else{
          document.getElementById('result-id').value = 'Fail';
        }
        document.getElementById('feedback-id').value = report.Comment;
      }
    } else {
      console.log("Failed to fetch the result.");
      document.getElementById('noResult').style.display='block';
    }
  }
  

  async function showResultG2() {
    console.log('Result button clicked');
    const response = await fetch(`${API_URL}/G2/getResult`, {
      method: "GET", // "Get" should be "GET" (uppercase)
    });
  
    if (response.ok) {
      const report = await response.json(); // Parse response as JSON
      if (report.Result != null && report.Comment != null) {
        document.getElementById('Result-display-G2').style.display = 'block';
        if(report.Result==true)
            document.getElementById('result-id-G2').value = 'Pass';
        else{
          document.getElementById('result-id-G2').value = 'Fail';
        }
        document.getElementById('feedback-id-G2').value = report.Comment;
      }
    } else {
      console.log("Failed to fetch the result.");
      document.getElementById('noResult-G2').style.display='block';
    }
  }