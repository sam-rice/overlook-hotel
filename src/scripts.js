import "./css/styles.css";
import "./images/turing-logo.png";
import Booking from "../src/classes/Booking";
import Customer from "../src/classes/Customer";
import Manager from "../src/classes/Manager";
import Room from "../src/classes/Room";
import {getData, postData} from "./api-calls";

let allBookings;
let allCustomers;
let allRooms;

let allBookingsURL = "http://localhost:3001/api/v1/bookings";
let allCustomersURL = "http://localhost:3001/api/v1/customers";
let allRoomsURL = "http://localhost:3001/api/v1/rooms";

window.addEventListener("load", () => {
  fetchData([allBookingsURL, allCustomersURL, allRoomsURL]);
});

function fetchData(urls) {
  Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
    .then(data => {
      allBookings = data[0]
      allCustomers = data[1]
      allRooms = data[2]
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
}

function initPage() {
  console.log("page init");
  console.log(allBookings, allCustomers, allRooms)
}
