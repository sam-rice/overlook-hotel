import Guest from "./Guest"

class GuestList {
  constructor(allGuestsData) {
    this.guests = this.initGuests(allGuestsData)
  };

  initGuests(allGuestsData) {
    return allGuestsData.map(guest => new Guest(guest))
  }

  checkUserCredentials(username, password) {
    if (password === "overlook2021") {
      let id = Number(username.replace("customer", ""));
      return this.guests.find(guest => guest.id === id);
    } else {
      return;
    };
  };
};

export default GuestList;