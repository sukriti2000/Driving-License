//getting elements from appointment.ejs
const appointmentAlert = document.getElementById("AppointmentAlert");
const appointmentDate = document.getElementById("appointmentDate");
const slotsContainer = document.getElementById("slotsContainer");
const bookSelect = document.getElementById("bookSelect");
const bookAlert = document.getElementById("bookAlert");
const bookDate = document.getElementById("dateBook");

const cancelBtn = document.getElementById("cancelBtn");
const bookG2Btn = document.getElementById("bookG2Btn");
const bookBtn = document.getElementById("bookBtn");


//initializing slots array based on their availability
let selectedButtons = [];
let availableSlots = [];
let appointmentSelectedDate;



//initializing slots array
const slots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 AM",
  "12:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
];
function createSlotsButton(unavailabeSlots) {
  //colors according to availability
  const unavailableColor = "#bbb3b7";
  const availableColor = "#9e4f73";
  const confirmColor = "#5DBB63";

  slotsContainer.innerHTML = "";
  let html = "";
  for (const slot of slots) {
    if (unavailabeSlots.includes(slot)) {
      html += `<button type="button" class="btn btn-primary border-0 me-2 mb-2" style="background-color:${unavailableColor};margin:20px;" disabled>${slot}</button>`;
    } else {
      html += `<button type="button" class="btn btn-primary border-0 me-2 mb-2 available-button" style="background-color:${availableColor};margin:20px;" >${slot}</button>`;
    }
  }


  slotsContainer.innerHTML = html;

  const availableButtons = document.querySelectorAll(".available-button");

  availableButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.style.backgroundColor = confirmColor;
      if (!selectedButtons.includes(button.innerHTML))
        selectedButtons.push(button.innerHTML);
      console.log(selectedButtons);
    });
  });
}

const getSlotsFromServer = async (date) => {
  const response = await fetch(`/appointment/${encodeURIComponent(date)}`, {
    method: "Get",
  });
  const data = await response.json();
  console.log("Appointments:", data);
  availableSlots = data;
  return data.map((slot) => slot.time);
};

const postNewBookingsToServer = async () => {
  const data = {
    date: appointmentSelectedDate,
    slots: selectedButtons,
  };
  console.log("hello",data);
  const response = await fetch("/appointment", {
    method: "Post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });

  const appointmentAlertText = appointmentAlert.firstElementChild;
  if (response.ok) {
    createSlotsButton(await getSlotsFromServer(appointmentSelectedDate));
    appointmentAlert.style.display = "block";
    appointmentAlert.classList.remove("alert-danger");
    appointmentAlert.classList.add("alert-success");
    appointmentAlertText.textContent = "Appointments booked Successfully!";
  } else {
    appointmentAlert.style.display = "block";
    appointmentAlert.classList.remove("alert-success");
    appointmentAlert.classList.add("alert-danger");
    appointmentAlertText.textContent = "Something went wrong!";
  }
};


const createSlotsSelect = () => {
  bookSelect.innerHTML = "";
  let html = "";
  availableSlots.forEach((slot) => {
    if (slot.isTimeSlotAvailable)
      html += `<option value="${slot._id}" selected>${slot.time}</option>`;
  });
  bookSelect.innerHTML = html;
};

const postUserAppointmentId = async (id) => {
  const data = {
    userName: getUserNameFromCookie(),
    appointmentId: id,
  };
  console.log("hello",data);
  const response = await fetch(`/appointment`, {
    method: "Put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const bookAlertText = bookAlert.firstElementChild;
  console.log("hello",response.json());
  if (response.ok) {
    bookAlert.style.display = "block";
    bookAlert.classList.remove("alert-danger");
    bookAlert.classList.add("alert-success");
    bookAlertText.textContent = "Appointment booked Successfully!";
  } else {
    bookAlert.style.display = "block";
    bookAlert.classList.remove("alert-success");
    bookAlert.classList.add("alert-danger");
    bookAlertText.textContent = "Something went wrong!";
  }
};


document.addEventListener("DOMContentLoaded", () => {
  if (bookDate)
    bookDate.addEventListener("change", async () => {
      bookSelectedDate = bookDate.value;
      const bookSlots = await getSlotsFromServer(bookSelectedDate);
      createSlotsSelect();
    });
  if (bookSelect)
    bookSelect.addEventListener("change", () => {
      console.log("Select Change:", bookSelect.value);
    });
  if (appointmentDate)
    appointmentDate.addEventListener("change", async () => {
     
      appointmentSelectedDate = appointmentDate.value;
      selectedButtons = [];
      const bookedSlots = await getSlotsFromServer(appointmentSelectedDate);
      createSlotsButton(bookedSlots);
      console.log("appointment date:", appointmentSelectedDate);
    });
  if (cancelBtn)
    cancelBtn.addEventListener("click", async () => {
      selectedButtons = [];
      const bookedSlots = await getSlotsFromServer(appointmentSelectedDate);
      createSlotsButton(bookedSlots);
    });
  if (bookG2Btn)
    bookG2Btn.addEventListener("click", () =>
      postUserAppointmentId(bookSelect.value)
    );
  if (bookBtn)
    bookBtn.addEventListener("click", () => {
      console.log("Final Booking", selectedButtons);
      postNewBookingsToServer();
      
    });
});
function getUserNameFromCookie() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const [name, value] = cookie.split("=");
  
      if (name === "userName") {
        return value;
      }
    }
  }


  //deleting the cookies:
  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  
  function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const [name, _] = cookie.split("=");
      deleteCookie(name); // Delete the cookie
    }
    window.location.replace("http://localhost:3000/login");
  }
  
  
 