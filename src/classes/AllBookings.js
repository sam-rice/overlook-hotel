import Booking from "./Booking"

class AllBookings {
  constructor(allBookingsData, allRoomsData) {
    this.bookings = this.getBookings(allBookingsData)
    this.rooms = allRoomsData
  };

  getBookings(allBookingsData) {
    return allBookingsData.map(bookingObject => new Booking(bookingObject));
  };
};

export default AllBookings;