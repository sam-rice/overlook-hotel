import allBookings from "../scripts"
// import test from "../scripts"

class Customer {
  constructor(object) {
    this.id = object.id
    this.name = object.name
  };

  //invoke this like Customer.getTotalSpent(allBookings.bookings)
  getTotalSpent(bookings) {
    
  };

  getAllBookings() {

  }

};

export default Customer;