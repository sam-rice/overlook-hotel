import chai from "chai";
const expect = chai.expect;
import Guest from "../src/classes/Guest";
import BookingList from "../src/classes/BookingList";
import Room from "../src/classes/Room";
import customers from "./test-data/customers-test-data";
import bookings from "./test-data/bookings-test-data";
import rooms from "./test-data/rooms-test-data";

describe('Guest Class', function() {
  let guest1, guest2, bookingList;

  this.beforeEach(() => {
    bookingList = new BookingList(bookings, rooms);
    guest1 = new Guest(customers[0]);
    guest2 = new Guest(customers[1]);
  });

  it('should be an instance of the Guest Class.', function() {
    expect(guest1).to.be.an.instanceOf(Guest);
  });
 
  it('should have properties for a guest\'s name and id.', function() {
    expect(guest1.id).to.eql(1);
    expect(guest1.name).to.eql("Leatha Ullrich");
    expect(guest2.id).to.eql(2);
    expect(guest2.name).to.eql("Rocio Schuster");
  });

  it('should be able to calculate the total a guest has spent in the past.', function() {
    expect(guest1.getTotalSpent(bookingList)).to.eql(172.09);
    expect(guest2.getTotalSpent(bookingList)).to.eql(686.55);
  });

  it('should be able to return an object with an array of past bookings and upcoming bookings.', function() {
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
      }]
    });
  });
});