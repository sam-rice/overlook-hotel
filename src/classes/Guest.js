class Guest {
  constructor(object) {
    this.id = object.id
    this.name = object.name
  };

  getTotalSpent(bookingList) {
    return Number(bookingList.bookings.reduce((acc, booking) => {
      let isPastDate = (new Date(booking.date) < new Date());
      if (isPastDate && booking.guestId === this.id) {
        acc += bookingList.rooms.find(room => room.number === booking.roomNumber).costPerNight;
      }
      return acc;
    }, 0));
  };

  getAllBookings(bookingList) {
    return bookingList.bookings.reduce((acc, booking) => {
      if (booking.guestId === this.id) {
        let targetRoom = bookingList.rooms.find(room => room.number === booking.roomNumber);
        let currentDate = new Date();
        currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        let isFutureDate = currentDate <= booking.date;
        let bookingObject = {
          date: booking.date,
          roomNumber: booking.roomNumber,
          numBeds: targetRoom.numBeds,
          bedSize: targetRoom.bedSize,
          roomType: targetRoom.roomType,
          costPerNight: targetRoom.costPerNight.toFixed(2),
          id: booking.id
        };
        
        if (isFutureDate) {
          acc.upcomingBookings.push(bookingObject);
        } else {
          acc.pastBookings.push(bookingObject);
        };
      };
      return acc;
    }, {
      pastBookings: [],
      upcomingBookings: []
    });
  };
};

export default Guest;