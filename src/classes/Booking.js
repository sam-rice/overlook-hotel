class Booking {
  constructor(object) {
    this.id = object.id
    this.guestId = object.userID
    this.date = object.date
    this.roomNumber = object.roomNumber
  };
};

export default Booking;