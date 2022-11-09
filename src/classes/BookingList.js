import Booking from "./Booking"

class BookingList {
  constructor(allBookingsData, allRoomsData) {
    this.bookings = this.initBookings(allBookingsData)
    this.rooms = allRoomsData
  };

  initBookings(allBookingsData) {
    return allBookingsData.map(bookingObject => new Booking(bookingObject));
  };
};

export default BookingList;