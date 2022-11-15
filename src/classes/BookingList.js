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

  getTodaysRevenue() {
    return this.bookings.reduce((acc, booking) => {
      let bookingDate = new Date(booking.date).toString().slice(0, 15);
      let todaysDate = new Date().toString().slice(0, 15);

      if (bookingDate === todaysDate) {
        let targetRoom = this.rooms.find(room => room.number === booking.roomNumber);
        acc += targetRoom.costPerNight;
      }
      return acc;
    }, 0);
  };

  getVacancyData(date) {
    let vacantRooms = this.getAvailableRooms(date).length;

    return {
      vacant: vacantRooms,
      percentVacant: (vacantRooms / 25) * 100,
      booked: 25 - vacantRooms,
      percentBooked: ((25 - vacantRooms) / 25) * 100
    };
  };
};

export default BookingList;