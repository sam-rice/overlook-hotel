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

  getAvailableRooms(date) {
    let roomNums = this.rooms.map(room => room.number);
    this.bookings.forEach(booking => {
      if (booking.date === date) {
        roomNums.splice(roomNums.indexOf(booking.roomNumber), 1);
      };
    });
    return roomNums.map(num => {
      return this.rooms.find(room => room.number === num);
    });
  };

  getRoomByNumber(num) {
    return this.rooms.find(room => room.number == num);
  };

  getfilteredRooms(date, option) {
    let availRooms = this.getAvailableRooms(date);
    return availRooms.filter(room => room.roomType === option);
  };
};

export default BookingList;