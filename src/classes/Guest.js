class Guest {
  constructor(object) {
    this.id = object.id
    this.name = object.name
  };

  //invoke this like => Guest.getTotalSpent(allBookings.bookings)
  getTotalSpent(bookingsData) {

  };

  getAllBookings(bookingList) {
    return bookingList.bookings.reduce((acc, booking) => {
      if (booking.guestId === this.id) {
        let targetRoom = bookingList.rooms.find(room => room.number === booking.roomNumber);
        let isFutureDate = (new Date(booking.date) > new Date());
        let bookingObject = {
          date: booking.date,
          roomNumber: booking.roomNumber,
          numBeds: targetRoom.numBeds,
          bedSize: targetRoom.bedSize,
          roomType: targetRoom.roomType,
          costPerNight: targetRoom.costPerNight
        };
        if (isFutureDate) {
          acc.futureBookings.push(bookingObject);
        } else {
          acc.pastBookings.push(bookingObject);
        };
      };
      return acc;
    }, {
      pastBookings: [],
      futureBookings: []
    });
  };

};

export default Guest;