import "./css/styles.css";
import "./images/turing-logo.png";
import AllBookings from "../src/classes/AllBookings";
// import Booking from "../src/classes/Booking";
import Customer from "../src/classes/Customer";
import Manager from "../src/classes/Manager";
import {getData, postData} from "./api-calls";

//------------------------------UTILITY DATA------------------------------//

let allBookingsData;
let allCustomersData;

let allBookingsURL = "http://localhost:3001/api/v1/bookings";
let allCustomersURL = "http://localhost:3001/api/v1/customers";
let allRoomsURL = "http://localhost:3001/api/v1/rooms";

//------------------------------DATA MODEL------------------------------//

let allRooms; // raw data from API fetch
let allBookings; // instance of AllBookings class
let allCustomers; // array of all instances of Customer class

function fetchData(urls) {
  Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
    .then(data => {
      allBookingsData = data[0].bookings
      allCustomersData = data[1].customers
      allRooms = data[2].rooms
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
}

//------------------------------EVENT LISTENERS------------------------------//

window.addEventListener("load", () => {
  fetchData([allBookingsURL, allCustomersURL, allRoomsURL]);
});

//------------------------------EVENT HANDLERS------------------------------//





//------------------------------DATA FUNCTIONS------------------------------//

function initPage() {
  initAllBookings()
  initAllCustomers()
  console.log("page init");
  console.log(allBookings, allCustomers, allRooms)
}

function initAllBookings() {
  allBookings = new AllBookings(allBookingsData, allRooms);
}

function initAllCustomers() {
  allCustomers = allCustomersData.map(customer => new Customer(customer))
}

//------------------------------UTILITY FUNCTIONS------------------------------//





//------------------------------DOM UPDATING------------------------------//