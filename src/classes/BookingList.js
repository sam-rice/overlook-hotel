import Booking from "./Booking"
import Room from "./Room"

class BookingList {
  constructor(allBookingsData, allRoomsData) {
    this.bookings = this.initBookings(allBookingsData)
    this.rooms = this.initRooms(allRoomsData)
  };

  initBookings(allBookingsData) {
    return allBookingsData.map(bookingObject => new Booking(bookingObject));
  };

  initRooms(allRoomsData) {
    return allRoomsData.map(roomObject => new Room(roomObject));
  };

};

export default BookingList;