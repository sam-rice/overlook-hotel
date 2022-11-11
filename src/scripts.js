import "./css/styles.css";
// import "./images/bachman-cropped.jpg";
import "./images/metrograph-interior.jpg";
import "./images/imperial-bedroom-left.jpg";
import BookingList from "../src/classes/BookingList";
import Manager from "../src/classes/Manager";
import {getData, postData} from "./api-calls";
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

function fetchData(urls) {
  Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
    .then(data => {
      allBookingsData = data[0].bookings;
      allGuestsData = data[1].customers;
      allRooms = data[2].rooms;
      initPage();
    })
    .catch(error => {
      if (error instanceof TypeError) {
        alert("Looks like we're having problems. Please try again later.");
      } else if (error instanceof ReferenceError) {
        alert("Looks like something broke on our end. Please try again later.");
      } else {
        alert("An error occured. Please try again later.");
      }
    });
};

//----------------------QUERY SELECTORS----------------------//

const profileButton = document.getElementById("profile-button");
const profileParent = document.getElementById("profile-parent");
const bookButtonHeader = document.getElementById("book-button-header");
const bookButton = document.getElementById("book-button");
const bookParent = document.getElementById("book-parent");
const aboutButton = document.getElementById("about-button");
const aboutParent = document.getElementById("about-parent");
const guestNameDash = document.getElementById("dash-guest-name");
const upcomingBookingsTable = document.getElementById("upcoming-stays-tbody");
const pastBookingsTable = document.getElementById("past-stays-tbody");
const totalSpentTag = document.getElementById("total-spent");
const accordionWelcome = document.getElementById("accordion-welcome");


//----------------------EVENT LISTENERS----------------------//

window.addEventListener("load", () => {
  fetchData([allBookingsURL, allGuestsURL, allRoomsURL]);
});

profileButton.addEventListener("click", () => {
  showAccordion(profileParent, profileButton);
  profileParent.scrollIntoView( {behavior: "smooth"} );
});

bookButtonHeader.addEventListener("click", () => {
  showAccordion(bookParent, bookButton);
  bookParent.scrollIntoView( {behavior: "smooth"} );
});
bookButton.addEventListener("click", () => {
  showAccordion(bookParent, bookButton);
  bookParent.scrollIntoView( {behavior: "smooth"} );
});

aboutButton.addEventListener("click", () => {
  showAccordion(aboutParent, aboutButton);
  aboutParent.scrollIntoView( {behavior: "smooth"} );
});

//----------------------EVENT HANDLERS----------------------//






//----------------------DATA FUNCTIONS----------------------//

function initPage() {
  initBookingList();
  initGuestList();
  initGuest();
  renderGuestDash();
  console.log(bookingList, guest);
};

function initBookingList() {
  bookingList = new BookingList(allBookingsData, allRooms);
};

function initGuestList() {
  guestList = new GuestList(allGuestsData);
};

function initGuest() {
  guest = guestList.guests[getRandomArrayIndex(guestList.guests)];
};

//----------------------UTILITY FUNCTIONS----------------------//

//remove after login page added
function getRandomArrayIndex(array) {
  return Math.floor(Math.random() * array.length);
};



//----------------------DOM UPDATING----------------------//

function showAccordion(element, button) {
  element.classList.toggle("show");
  button.classList.toggle("accordion-button-open");
};

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
    table.innerHTML += `<tr>
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.numBeds} / ${booking.bedSize}</td>
        <td>${booking.roomType}</td>
        <td>${booking.costPerNight}</td>
      </tr>`;
  });
};