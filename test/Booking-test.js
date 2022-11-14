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
});