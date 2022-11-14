import chai from "chai";
const expect = chai.expect;
import Booking from "../src/classes/Booking";
import bookings from "./test-data/bookings-test-data";

describe('Booking Class', function() {
  let booking;

  this.beforeEach(() => {
    booking = new Booking(bookings[0]);
  });

  it('should be an instance of the Booking Class', function() {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it('should have properties for a booking ID, guest ID, date, and room number.', function() {
    expect(booking).to.haveOwnProperty("id");
    expect(booking).to.haveOwnProperty("guestId");
    expect(booking).to.haveOwnProperty("date");
    expect(booking).to.haveOwnProperty("roomNumber");
  });

  it('should have properties with properly-formatted values.', function() {
    expect(booking.id).to.eql("5fwrgu4i7k55hl6sz");
    expect(booking.guestId).to.eql(9);
    expect(booking.date).to.eql("2022-04-22");
    expect(booking.roomNumber).to.eql(15);
  });
});