import "./css/styles.css";
import "./images/bachman-cropped.jpg";
import "./images/imperial-bedroom-left.png";
import BookingList from "../src/classes/BookingList";
import Manager from "../src/classes/Manager";
import {getData, postData} from "./api-calls";
import GuestList from "./classes/GuestList";

//------------------------------UTILITY DATA------------------------------//

let allBookingsData;
let allGuestsData;

let allBookingsURL = "http://localhost:3001/api/v1/bookings";
let allGuestsURL = "http://localhost:3001/api/v1/customers";
let allRoomsURL = "http://localhost:3001/api/v1/rooms";

//------------------------------DATA MODEL------------------------------//

let allRooms; // raw data from API fetch
let bookingList; // instance of BookingList class
let guestList; // instance of GuestList

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

//------------------------------EVENT LISTENERS------------------------------//

window.addEventListener("load", () => {
  fetchData([allBookingsURL, allGuestsURL, allRoomsURL]);
});

//------------------------------EVENT HANDLERS------------------------------//






//------------------------------DATA FUNCTIONS------------------------------//

function initPage() {
  initBookingList();
  initGuestList();
  console.log(guestList, bookingList)
};

function initBookingList() {
  bookingList = new BookingList(allBookingsData, allRooms);
};

function initGuestList() {
  guestList = new GuestList(allGuestsData)
};

//------------------------------UTILITY FUNCTIONS------------------------------//





//------------------------------DOM UPDATING------------------------------//