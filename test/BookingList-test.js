import chai from "chai";
const expect = chai.expect;
// import Guest from "../src/classes/Guest";
import BookingList from "../src/classes/BookingList";
import Booking from "../src/classes/Booking";
import Room from "../src/classes/Room";
// import customers from "./test-data/customers-test-data";
import bookings from "./test-data/bookings-test-data";
import rooms from "./test-data/rooms-test-data";

describe('BookingList Class', function() {
  let bookingList;

  this.beforeEach(() => {
    bookingList = new BookingList(bookings, rooms);
  });

  it('should have a property that holds every booking.', function() {
    expect(bookingList.bookings.length).to.eql(bookings.length);
    expect(bookingList.bookings[0]).to.be.an.instanceOf(Booking);
  });

  it('should have a property that holds every room.', function() {
    expect(bookingList.rooms.length).to.eql(rooms.length);
    expect(bookingList.rooms[0]).to.be.an.instanceOf(Room);
  });

  it('should be able to return an array of available rooms when given a date.', function() {
    expect(bookingList.getAvailableRooms("2022-01-12").length).to.eql(21);
    expect(bookingList.getAvailableRooms("2022-01-12")[6]).to.eql(bookingList.rooms[7]);
  });

  it('should be able to return a room when given a room number.', function() {
    expect(bookingList.getRoomByNumber(3)).to.eql(bookingList.rooms[2]);
    expect(bookingList.getRoomByNumber(17)).to.eql(bookingList.rooms[16]);
  });

  it('should be able to filter available rooms by the <Room.roomType> property.', function() {
    expect(bookingList.getFilteredRooms("2022-01-12", "single room").length).to.eql(11);
    expect(bookingList.getFilteredRooms("2022-01-12", "single room")[2]).to.eql(bookingList.rooms[6]);

  });

});