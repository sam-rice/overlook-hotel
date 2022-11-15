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

  getFilteredRooms(date, option) {
    let availRooms = this.getAvailableRooms(date);
    return availRooms.filter(room => room.roomType === option);
  };

  getTodaysRevenue(todaysDate) {
    return this.bookings.reduce((acc, booking) => {
      if (booking.date === todaysDate) {
        let targetRoom = this.rooms.find(room => room.number === booking.roomNumber);
        acc += targetRoom.costPerNight;
      }
      return acc;
    }, 0);
  };

  getVacancyData(date) {
    let numVacantRooms = this.getAvailableRooms(date).length;

    return {
      vacant: numVacantRooms,
      percentVacant: ((numVacantRooms / 25) * 100).toFixed(0),
      booked: 25 - numVacantRooms,
      percentBooked: (((25 - numVacantRooms) / 25) * 100).toFixed(0)
    };
  };
};

export default BookingList;