import Guest from "./Guest"

class GuestList {
  constructor(allGuestsData) {
    this.guests = this.initGuests(allGuestsData)
  };

  initGuests(allGuestsData) {
    return allGuestsData.map(guest => new Guest(guest))
  }
};

export default GuestList;