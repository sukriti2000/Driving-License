let filteredData = [];

async function searchDrivers(){
  console.log('button clicked');
  
  const filterSelection = document.getElementById('appointment-filter');
  var selectedValue = filterSelection.value;
  console.log("Selected value: " + selectedValue);
  
  const data = { TestType: selectedValue };
  
  try {
    const response = await fetch(`${API_URL}/examiner/filtered`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json(); // Await the JSON parsing
      // console.log("filtered data", responseData);
      
      // Store the response data in an array or process it as needed
      // For example:
      filteredData = Array.isArray(responseData) ? responseData : [responseData];
      
      // Now you can work with the dataArray as needed
      console.log("Stored data array", filteredData);
      displayData(filteredData);
    } else {
      console.error("Response not OK:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayData(data){
  const filterResultDiv = document.getElementById('filter-result');

  // Clear any existing content in the filter-result div
  filterResultDiv.innerHTML = '';

  // Create an unordered list element
  const resultList = document.createElement('ul');

  // Loop through the data array and create HTML for each element
  for (const item of data) {
    const listItemHTML = `<li onclick='DisplayDetails(event)' id='${item._id}'>${item.firstName}</li>`; // Customize this to display specific fields
    resultList.innerHTML += listItemHTML;
  }

  // Append the list to the filter-result div
  filterResultDiv.appendChild(resultList);
}

function DisplayDetails(event){
  const clickedListItem = event.target;
  const itemId = clickedListItem.getAttribute('id');
  const selectedItem = filteredData.find(item => item._id === itemId);
  // clickedListItem.innerHTML=``;

  if (selectedItem) {
    const detailsDiv = document.createElement('div');
    detailsDiv.style.border = '1px black';
    detailsDiv.innerHTML = `
      <p> First name : ${selectedItem.firstName}</p>
      <p> Last name : ${selectedItem.lastName}</p>
      <p> date of birth : ${selectedItem.dateOfBirth}</p>
      <p> License Number : ${selectedItem.licenseNumber}</p>
      <div class="container" style="border: 1px black; height: auto; width: auto;">
        <fieldset id="upload-section">
          <div class="form-row">
            <label for="Result">User Type</label>
            <select class="form-select" name="Result" id="result-upload">
              <option selected>Select</option>
              <option value="true">Pass</option>
              <option value="false">Fail</option>
            </select>
            <div class="form-group col-md-6">
              <label for="feedback">Feedback</label>
              <input type="text" class="form-control" id="feedback">
            </div>
          </div>
        </fieldset>
        <button type="button" class="btn btn-primary" id="submitResult" onclick="uploadResult(event)" parent-id="${selectedItem._id}">Upload Result</button>
      </div>
    `;

    clickedListItem.appendChild(detailsDiv);
  } 
}

async function uploadResult(event){
  
  const clickedButton = event.target;
  
  const parentId = clickedButton.getAttribute('parent-id');
  // Find the details div by traversing to its parent element
  const detailsDiv = clickedButton.parentElement;
  
  // Find the input elements by their IDs within the details div
  const resultSelect = detailsDiv.querySelector("#result-upload");
  const feedbackInput = detailsDiv.querySelector("#feedback");

  // Get the selected value from the result select
  const selectedResult = resultSelect.value;

  // Get the value from the feedback input
  const feedbackValue = feedbackInput.value;

  // Now you can use the selectedResult and feedbackValue as needed
  console.log("Selected Result:", selectedResult);
  console.log("Feedback Value:", feedbackValue);
  console.log('parent id:',parentId);

  const uploadObject = {
    id : parentId,
    result : selectedResult==='true',
    feedback : feedbackValue
  }
  try {
    const response = await fetch(`${API_URL}/examiner/UploadResult`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadObject),
    });

    if (response.ok) {
     
      console.log('result uploaded')
    } else {
      console.error("Response not OK:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//to display result in admin




let resultDisplay = [];
async function DisplayResults(){
  const resultType = document.getElementById('display-result').value;
   console.log('in display');
  const data = {Result : resultType==='true'}

  const response = await fetch(`${API_URL}/appointment/getResult`,{
    method : 'POST',
    headers :{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
 
  console.log('response',response);
  if (response.ok) {
    const responseData = await response.json(); // Await the JSON parsing
    console.log("filtered data", responseData);
    
    // Store the response data in an array or process it as needed
    // For example:
    resultDisplay = Array.isArray(responseData) ? responseData : [responseData];

    const list = document.getElementById('Candidate-Results');
    list.innerHTML=``;
      // Loop through the data array and create HTML for each element
  for (const item of resultDisplay) {
    const listItemHTML = `<li >${item.firstName}</li>`; // Customize this to display specific fields
    list.innerHTML += listItemHTML;
  }
   
    console.log('got result');
  } else {
    console.error("Response not OK:", response.statusText);
  }
} 