import chai from "chai";
const expect = chai.expect;
import BookingList from "../src/classes/BookingList";
import Booking from "../src/classes/Booking";
import Room from "../src/classes/Room";
import bookings from "./test-data/bookings-test-data";
import rooms from "./test-data/rooms-test-data";

describe('BookingList Class', function () {
  let bookingList;

  function getReformattedCurrentDate() {
    let currentDate = new Date();
    return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  };

  this.beforeEach(() => {
    bookingList = new BookingList(bookings, rooms);
    let bookingObject = {
      id: "5fwrgu4i7k55hl6y5",
      userID: 13,
      date: getReformattedCurrentDate(),
      roomNumber: 19
    }
    bookingList.bookings.push(new Booking(bookingObject))
  });

  it('should have a property that holds every booking.', function () {
    expect(bookingList.bookings.length).to.eql(bookings.length + 1);
    expect(bookingList.bookings[0]).to.be.an.instanceOf(Booking);
  });

  it('should have a property that holds every room.', function () {
    expect(bookingList.rooms.length).to.eql(rooms.length);
    expect(bookingList.rooms[0]).to.be.an.instanceOf(Room);
  });

  it('should return an array of available rooms when given a date.', function () {
    expect(bookingList.getAvailableRooms("2022-01-12").length).to.eql(21);
    expect(bookingList.getAvailableRooms("2022-01-12")[6]).to.eql(bookingList.rooms[7]);
  });

  it('should return a room when given a room number.', function () {
    expect(bookingList.getRoomByNumber(3)).to.eql(bookingList.rooms[2]);
    expect(bookingList.getRoomByNumber(17)).to.eql(bookingList.rooms[16]);
  });

  it('should filter available rooms by their <roomType> property.', function () {
    expect(bookingList.getFilteredRooms("2022-01-12", "single room").length).to.eql(11);
    expect(bookingList.getFilteredRooms("2022-01-12", "single room")[2]).to.eql(bookingList.rooms[6]);
  });

  it('should return today\'s total revenue.', function () {
    expect(bookingList.getTodaysRevenue(getReformattedCurrentDate())).to.eql(374.67);
  });

  it('should return an object with the number of vacant/booked rooms and and percentages for both.', function () {
    let expectedObject = {
      vacant: 24,
      percentVacant: "96",
      booked: 1,
      percentBooked: "4"
    };

    expect(bookingList.getVacancyData(getReformattedCurrentDate())).to.eql(expectedObject);
  });
});