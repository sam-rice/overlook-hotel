import "./css/styles.css";
import "./images/metrograph-interior.jpg";
import "./images/imperial-bedroom-left.jpg";
import BookingList from "../src/classes/BookingList";
// import Manager from "../src/classes/Manager";
import { getData, postData, deleteData } from "./api-calls";
import GuestList from "./classes/GuestList";

//----------------------UTILITY DATA----------------------//

let allBookingsData;
let allGuestsData;

let allBookingsURL = "http://localhost:3001/api/v1/bookings";
let allGuestsURL = "http://localhost:3001/api/v1/customers";
let allRoomsURL = "http://localhost:3001/api/v1/rooms";

//----------------------DATA MODEL----------------------//

let allRooms;
let bookingList;
let guestList;
let guest;
// let manager;

let newBooking;
let selectedRoom;
let confirmedBookingId;

let adminSelectedGuest;
let adminSelectedBooking;

function fetchData(urls) {
  Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
    .then(data => {
      allBookingsData = data[0].bookings;
      allGuestsData = data[1].customers;
      allRooms = data[2].rooms;
      initPage();
    })
  // .catch(error => {
  //   if (error instanceof TypeError) {
  //     alert("Looks like we're having problems. Please try again later.");
  //   } else if (error instanceof ReferenceError) {
  //     alert("Looks like something broke on our end. Please try again later.");
  //   } else {
  //     alert("An error occured. Please try again later.");
  //   }
  // });
};

//----------------------QUERY SELECTORS----------------------//

const logo = document.getElementById("logo");
const userLoginView = document.getElementById("user-login-view");
const loginButton = document.getElementById("login-button");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");
const guestHeaderSub = document.getElementById("header-subtext-guest");
const adminHeaderSub = document.getElementById("header-subtext-admin");
const signOutButton = document.getElementById("sign-out-button");
const adminView = document.getElementById("admin-view");
const bannerParent = document.getElementById("banner-parent");
const userToolsView = document.getElementById("user-tools-view");
const profileButton = document.getElementById("profile-button");
const profileParent = document.getElementById("profile-parent");
const bookButtonHeader = document.getElementById("book-button-header");
const dashParent = document.getElementById("dash-parent");
const bookParent = document.getElementById("book-parent");
const bookButtonAcc = document.getElementById("book-button-accordion");
const aboutButton = document.getElementById("about-button");
const aboutParent = document.getElementById("about-parent");
const guestNameDash = document.getElementById("dash-guest-name");
const upcomingBookingsTable = document.getElementById("upcoming-stays-tbody");
const pastBookingsTable = document.getElementById("past-stays-tbody");
const totalSpentTag = document.getElementById("total-spent");
const accordionWelcome = document.getElementById("accordion-welcome");
const dateGrandparent = document.getElementById("date-grandparent");
const dateInput = document.getElementById("date-input");
const backToCalButton = document.getElementById("back-to-cal");
const submitDateButton = document.getElementById("submit-date");
const dateError = document.getElementById("date-error");
const roomsGrandparent = document.getElementById("rooms-grandparent");
const availRoomsTable = document.getElementById("avail-rooms-table");
const roomsFilter = document.getElementById("rooms-filter");
const clearButton = document.getElementById("clear-filter");
const submitRoomButton = document.getElementById("submit-room");
const roomError = document.getElementById("room-error");
const confirmGrandparent = document.getElementById("confirm-grandparent");
const detailsList = document.getElementById("details-list");
const editDetailsButton = document.getElementById("edit-details");
const confirmButton = document.getElementById("confirm-details");
const successGrandparent = document.getElementById("success-grandparent");
const successParent = document.getElementById("success-parent");
const homeButton = document.getElementById("home-button");

const statsDate = document.getElementById("stats-date");
const statsTable = document.getElementById("stats-table-body");
const guestSearchInput = document.getElementById("guest-search-input");
const guestSearchButton = document.getElementById("guest-search-button");
const guestSearchTable = document.getElementById("guest-search-table");
const adminGuestBookingsTable = document.getElementById("admin-guest-bookings-table");
const adminRemoveBookingButton = document.getElementById("admin-remove-booking");


const adminDateInput = document.getElementById("admin-date-input");
const adminRoomSearch = document.getElementById("admin-room-search");


//----------------------EVENT LISTENERS----------------------//

window.addEventListener("load", () => {
  fetchData([allBookingsURL, allGuestsURL, allRoomsURL]);
});

logo.addEventListener("click", () => location.reload());

passwordInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    // console.log("works")
    // submit handler here
  }
})

loginButton.addEventListener("click", () => {
  let username = usernameInput.value;
  let password = passwordInput.value;

  if (username === "manager" && password === "overlook2021") {
    renderAdminView();
    displayAdminView();
  }

  let user = guestList.checkUserCredentials(username, password);

  if (user) {
    guest = user;
    renderGuestDash();
    displayGuestDash();
  } else {
    displayInvalidLogin();
  }

});

profileButton.addEventListener("click", () => {
  toggleAccordion(profileParent, profileButton);
  profileParent.scrollIntoView({ behavior: "smooth" });
  toggleAriaExpanded(profileButton);
});

bookButtonHeader.addEventListener("click", () => {
  let bookingConfirmedIsHidden = (successGrandparent.classList.contains("hide"));
  let bookingParentIsHidden = (bookParent.classList.contains("hide"))

  if (!bookingConfirmedIsHidden) {
    toggleAriaExpanded(bookButtonHeader);
    toggleHidden(successGrandparent);
    toggleHidden(bookParent);
  } else if (bookingParentIsHidden) {
    toggleAriaExpanded(bookButtonHeader);
    toggleHidden(dashParent);
    toggleHidden(bookParent);
  }
  bookParent.scrollIntoView({ behavior: "smooth" });
});

bookButtonAcc.addEventListener("click", () => {
  toggleAriaExpanded(bookButtonHeader);
  toggleHidden(dashParent);
  toggleHidden(bookParent);
  bookParent.scrollIntoView({ behavior: "smooth" });
});

aboutButton.addEventListener("click", () => {
  toggleAccordion(aboutParent, aboutButton);
  aboutParent.scrollIntoView({ behavior: "smooth" });
  toggleAriaExpanded(aboutButton);
});

submitDateButton.addEventListener("click", () => {
  let selectedDate = dateInput.value;
  if (!bookingList.getAvailableRooms(selectedDate).length) {
    dateError.innerText = "we're sorry! there are no available rooms for your selected date.";
    return;
  } else if (new Date(selectedDate) > Date.now()) {
    initNewBooking(selectedDate);
    renderAvailableRooms(bookingList.getAvailableRooms(selectedDate));
    toggleBookingAccordion(dateGrandparent);
    toggleBookingAccordion(roomsGrandparent);
    dateError.innerText = "";
    console.log(newBooking)
  } else {
    dateError.innerText = "* please select a valid date";
  }
});

availRoomsTable.addEventListener("click", e => {
  if (e.target.parentNode.nodeName === "TBODY") { return }
  selectedRoom = Number(e.target.parentNode.dataset.roomNum);
  deactivateTableNodes();
  activateSelectedNode(e.target.parentNode);
});

availRoomsTable.addEventListener('keypress', e => {
  if (e.key === "Enter") {
    selectedRoom = Number(document.activeElement.dataset.roomNum);
    deactivateTableNodes();
    activateSelectedNode(document.activeElement);
  }
})

roomsFilter.addEventListener("change", () => {
  if (roomsFilter.value === "") { return }
  renderAvailableRooms(bookingList.getFilteredRooms(dateInput.value, roomsFilter.value));
  clearButton.removeAttribute("disabled");
});

clearButton.addEventListener("click", () => {
  renderAvailableRooms(bookingList.getAvailableRooms(dateInput.value));
  clearButton.setAttribute("disabled", "");
  roomsFilter.value = "";
});

backToCalButton.addEventListener("click", () => {
  toggleBookingAccordion(roomsGrandparent);
  toggleBookingAccordion(dateGrandparent);
});

submitRoomButton.addEventListener("click", () => {
  if (selectedRoom) {
    newBooking["roomNumber"] = selectedRoom;
    console.log(newBooking);
    renderDetails();
    toggleBookingAccordion(roomsGrandparent);
    toggleBookingAccordion(confirmGrandparent);
  } else {
    roomError.innerText = "* please select a room";
  };
});

editDetailsButton.addEventListener("click", () => {
  toggleBookingAccordion(confirmGrandparent);
  toggleBookingAccordion(dateGrandparent);
});

confirmButton.addEventListener("click", () => {
  postData(newBooking, allBookingsURL)
    .then(response => response.json())
    .then(response => confirmedBookingId = response.newBooking.id)
    .then(() => getData(allBookingsURL))
    .then(data => {
      updateBookings(data.bookings);
      renderConfirmation();
      renderGuestDash();
      clearBookingMemory();
      toggleBookingAccordion(dateGrandparent);
      toggleBookingAccordion(confirmGrandparent);
      toggleHidden(bookParent);
      toggleHidden(successGrandparent);
      toggleAriaExpanded(bookButtonHeader);
    })
});

homeButton.addEventListener("click", () => {
  toggleHidden(successGrandparent);
  toggleHidden(dashParent);
});

guestSearchButton.addEventListener("click", () => renderGuestSearchResults());

//----------------------EVENT HANDLERS----------------------//






//----------------------DATA FUNCTIONS----------------------//

function initPage() {
  initBookingList();
  initGuestList();
  // initManager();
  console.log(guestList)



  //remove remove remove
  renderAdminView();




};

function initBookingList() {
  bookingList = new BookingList(allBookingsData, allRooms);
};

function initGuestList() {
  guestList = new GuestList(allGuestsData);
};

// function initManager() {
//   manager = new Manager(bookingList, guestList);
// }

function initNewBooking(date) {
  newBooking = {
    userID: guest.id,
    date: date.replace(/-/g, '/')
  }
}

function updateBookings(newData) {
  allBookingsData = newData;
  bookingList.bookings = bookingList.initBookings(allBookingsData);
}

function clearBookingMemory() {
  selectedRoom = null;
  newBooking = null;
  confirmedBookingId = null;
  dateInput.value = "";
  dateError.innerText = "";
  roomError.innerText = "";
}

//----------------------UTILITY FUNCTIONS----------------------//

function reformatCurrentDate() {
  let currentDate = new Date();
  return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
}

//----------------------DOM UPDATING----------------------//

function toggleAccordion(element, button) {
  element.classList.toggle("show");
  button.classList.toggle("accordion-button-open");
};

function toggleBookingAccordion(element) {
  element.classList.toggle("show");
  //toggle classlist for booking acc open?
}

function renderGuestDash() {
  let bookingsObject = guest.getAllBookings(bookingList);

  accordionWelcome.innerText = `welcome ${guest.name}.`;
  guestNameDash.innerText = guest.name;
  renderBookingsTable(bookingsObject, upcomingBookingsTable, true);
  renderBookingsTable(bookingsObject, pastBookingsTable, false);
  totalSpentTag.innerText = `total spent: $${guest.getTotalSpent(bookingList)}`;
};

function renderBookingsTable(bookingsObject, table, isFuture) {
  let bookings = isFuture ? "upcomingBookings" : "pastBookings"
  table.innerHTML = "";
  bookingsObject[bookings].forEach(booking => {
    table.innerHTML += `
      <tr tabindex="1">
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.numBeds} / ${booking.bedSize}</td>
        <td>${booking.roomType}</td>
        <td>${booking.costPerNight}</td>
      </tr>`;
  });
};

function toggleHidden(element) {
  element.classList.toggle("hide");
};
// quotes around data-room-num value blow
function renderAvailableRooms(availRooms) {
  availRoomsTable.innerHTML = "";
  availRooms.forEach(room => {
    availRoomsTable.innerHTML += `
      <tr class="avail-room-tr" data-room-num="${room.number}" tabindex="0" aria-selected="false">
        <td>${room.number}</td>
        <td>${room.numBeds} / ${room.bedSize}</td>
        <td>${room.hasBidet ? "yes" : "no"}</td>
        <td>${room.roomType}</td>
        <td>${room.costPerNight.toFixed(2)}</td>
      </tr>`;
  });
};

function deactivateTableNodes() {
  document.querySelectorAll("tr").forEach(node => {
    node.classList.remove("active");
    node.setAttribute("aria-selected", "false");
  });
};

function activateSelectedNode(element) {
  element.classList.add("active");
  element.setAttribute("aria-selected", "true");
};

function renderDetails() {
  let selectedRoom = bookingList.getRoomByNumber(newBooking.roomNumber);
  detailsList.innerHTML = "";
  detailsList.innerHTML = `
    <li class="guest-name-li">${guest.name}</li>
    <li>date: ${newBooking.date}</li>
    <li class="room-details-li">room details:</li>
    <ul class="room-details-ul">
      <li>room number: ${newBooking.roomNumber}</li>
      <li>number of beds: ${selectedRoom.numBeds}</li>
      <li>bed size: ${selectedRoom.bedSize}</li>
      <li>has bidet: ${selectedRoom.hasBidet ? "yes" : "no"}</li>
      <li>${selectedRoom.roomType}</li>
    </ul>
    <li class="total-li">total: <b>$${selectedRoom.costPerNight.toFixed(2)}</b></li>`;
};

function renderConfirmation() {
  successParent.innerHTML = "";
  successParent.innerHTML = `
  <h2>thank you ${guest.name}!</h2>
  <p>your room is booked!</p>
  <p>your confirmation code is:</p>
  <div class="conf-code">${confirmedBookingId}</div>`;
};

function toggleAriaExpanded(element) {
  if (element.getAttribute("aria-expanded") === "true") {
    element.setAttribute("aria-expanded", "false");
  } else {
    element.setAttribute("aria-expanded", "true");
  };
};

function displayInvalidLogin() {
  loginError.innerText = "* invalid username or password";
};

function displayGuestDash() {
  toggleHidden(userLoginView);
  toggleHidden(bookButtonHeader);
  toggleHidden(bannerParent);
  toggleHidden(userToolsView);
};

function renderAdminView() {
  renderDailyStats();
  renderAvailableRoomsTable();
};

function displayAdminView() {
  toggleHidden(guestHeaderSub);
  toggleHidden(userLoginView);
  toggleHidden(adminHeaderSub);
  toggleHidden(signOutButton);
  toggleHidden(adminView);
};

function getDOMDate() {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date();
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

function renderDailyStats() {
  statsDate.innerText = `${getDOMDate()}`;

  let vacancyData = bookingList.getVacancyData(reformatCurrentDate());
  statsTable.innerHTML = `
    <tr class="admin-table-row">
      <td>rooms available:</td>
      <td>${vacancyData.vacant}</td>
      <td>${vacancyData.percentVacant}%</td>
    </tr>
    <tr class="admin-table-row">
      <td>rooms booked:</td>
      <td>${vacancyData.booked}</td>
      <td>${vacancyData.percentBooked}%</td>
    </tr>
    <tr class="admin-table-row">
      <td>total revenue:</td>
      <td colspan="2">$${bookingList.getTodaysRevenue()}</td>
    </tr>`
}

const adminAvailRoomsTable = document.getElementById("admin-avail-rooms-table");

function renderAvailableRoomsTable() {
  adminAvailRoomsTable.innerHTML = "";
  bookingList.getAvailableRooms(reformatCurrentDate()).forEach(room => {
    adminAvailRoomsTable.innerHTML +=`
      <tr class="admin-table-row" tabindex="0">
        <td>${room.number}</td>
        <td>${room.numBeds} / ${room.bedSize}</td>
        <td>${room.hasBidet ? "yes" : "no"}</td>
        <td>${room.roomType}</td>
        <td>$${room.costPerNight.toFixed(2)}</td>
      </tr>`;
  });
};

function renderGuestSearchResults() {
  guestSearchTable.innerHTML = ""
  guestList.searchGuests(guestSearchInput.value).forEach(guest => {
    guestSearchTable.innerHTML +=  `
      <tr class="admin-table-row guest-result-row" data-guest-id="${guest.id}" tabindex="0" aria-selected="false">
        <td>${guest.name}</td>
        <td>${guest.id}</td>
      </tr>`;
  });
};

guestSearchTable.addEventListener("click", e => {
  let guestId = Number(e.target.parentNode.dataset.guestId)
  
  adminSelectedGuest = guestId;
  renderAdminGuestBookings(guestId)
  deactivateTableNodes();
  activateSelectedNode(e.target.parentNode);
})

adminGuestBookingsTable.addEventListener("click", e => {
  adminSelectedBooking = e.target.parentNode.dataset.bookingId;

  deactivateAdminBookingsNodes()
  activateSelectedNode(e.target.parentNode);
})

function renderAdminGuestBookings(guestId) {
  let targetGuest = guestList.guests.find(guest => guest.id === guestId);

  adminGuestBookingsTable.innerHTML = "";
  targetGuest.getAllBookings(bookingList).upcomingBookings.forEach(booking => {
    adminGuestBookingsTable.innerHTML += `
      <tr class="admin-table-row guest-result-row admin-guest-booking" data-booking-id="${booking.id}" aria-selected="false">
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.numBeds} / ${booking.bedSize}</td>
        <td>${booking.roomType}</td>
        <td>$${booking.costPerNight}</td>
      </tr>`;
  });
};

function deactivateAdminBookingsNodes() {
  document.querySelectorAll(".admin-guest-booking").forEach(node => {
    node.classList.remove("active");
    node.setAttribute("aria-selected", "false");
  });
};

adminRemoveBookingButton.addEventListener("click", () => {
  console.log(adminSelectedBooking)
  deleteData(`http://localhost:3001/api/v1/bookings/${adminSelectedBooking}`)
    .then(() => getData(allBookingsURL))
    .then(data => {
      updateBookings(data.bookings);

      adminSelectedBooking = null;
      deactivateAdminBookingsNodes();
      renderAdminGuestBookings(adminSelectedGuest)
      
    })
})