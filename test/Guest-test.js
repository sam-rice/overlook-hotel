import chai from "chai";
const expect = chai.expect;
import Guest from "../src/classes/Guest";
import BookingList from "../src/classes/BookingList";
import Room from "../src/classes/Room";
import customers from "./test-data/customers-test-data";
import bookings from "./test-data/bookings-test-data";
import rooms from "./test-data/rooms-test-data";
import Booking from "../src/classes/Booking";

describe('Guest Class', function () {
  let guest1, guest2, bookingList, newBookingObject;

  function getCurrentDateReformatted(char) {
    let currentDate = new Date();
    return `${currentDate.getFullYear()}${char}${currentDate.getMonth() + 1}${char}${currentDate.getDate()}`;
  }

  this.beforeEach(() => {
    bookingList = new BookingList(bookings, rooms);
    guest1 = new Guest(customers[0]);
    guest2 = new Guest(customers[1]);
    newBookingObject = {
      id: "5fwrgu4i7k55hl6x867",
      userID: 1,
      date: getCurrentDateReformatted("/"),
      roomNumber: 3
    };

    bookingList.bookings.push(new Booking(newBookingObject));
  });

  it('should be an instance of the Guest Class.', function () {
    expect(guest1).to.be.an.instanceOf(Guest);
  });

  it('should have properties for a guest\'s name and id.', function () {
    expect(guest1.id).to.eql(1);
    expect(guest1.name).to.eql("Leatha Ullrich");
    expect(guest2.id).to.eql(2);
    expect(guest2.name).to.eql("Rocio Schuster");
  });

  it('should calculate the total a guest has spent in the past.', function () {
    expect(guest1.getTotalSpent(bookingList)).to.eql(663.23);
    expect(guest2.getTotalSpent(bookingList)).to.eql(686.55);
  });

  it('should return an object with an array of past bookings and upcoming bookings.', function () {
    expect(guest1.getAllBookings(bookingList)).to.eql({
      pastBookings: [{
        date: "2022-02-05",
        roomNumber: 12,
        numBeds: 2,
        bedSize: "twin",
        roomType: "single room",
        costPerNight: "172.09",
        id: "5fwrgu4i7k55hl6t8"
      }],
      upcomingBookings: [{
        date: "2023-01-11",
        roomNumber: 20,
        numBeds: 1,
        bedSize: "queen",
        roomType: "residential suite",
        costPerNight: "343.95",
        id: "5fwrgu4i7k55hl6x8"
      },
      {
        date: getCurrentDateReformatted("-"),
        roomNumber: 3,
        numBeds: 1,
        bedSize: "king",
        roomType: "single room",
        costPerNight: "491.14",
        id: "5fwrgu4i7k55hl6x867"
      }]
    });
  });
});