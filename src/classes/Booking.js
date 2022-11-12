class Booking {
  constructor(object) {
    this.id = object.id
    this.guestId = object.userID
    this.date = object.date.replace(/\//g, '-')
    this.roomNumber = object.roomNumber
  };
};

export default Booking;