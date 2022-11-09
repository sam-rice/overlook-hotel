class Booking {
  constructor(object) {
    this.id = object.id
    this.customerId = object.customerID
    this.date = object.date
    this.roomNumber = object.roomNumber
  }
};

module.exports = Booking;