import chai from "chai";
const expect = chai.expect;
import Guest from "../src/classes/Guest";
import GuestList from "../src/classes/GuestList";
import customers from "./test-data/customers-test-data";

describe('GuestList Class', function() {
  let guestList;

  this.beforeEach(() => {
    guestList = new GuestList(customers);
  });

  it('should be an instance of the GuestList Class.', function() {
    expect(guestList).to.be.an.instanceOf(GuestList);
  });
 
  it('should have a property that holds every guest.', function() {
    expect(guestList.guests.length).to.eql(customers.length);
    expect(guestList.guests[0]).to.be.an.instanceOf(Guest);
  });

  it('should have a method that, when given a specific username and correct password, returns the appropriate guest.', function() {
    expect(guestList.checkUserCredentials("customer6", "overlook2021")).to.eql(guestList.guests[5]);
    expect(guestList.checkUserCredentials("customer9", "overlook2021")).to.eql(guestList.guests[8]);
    expect(guestList.checkUserCredentials("customer9", "wrongpassword")).to.eql(undefined);
    expect(guestList.checkUserCredentials("nonexistent customer", "overlook2021")).to.eql(undefined);
  });

  it('should return an array of guests when given a string that matches or partly matches any guest\'s name.', function() {
    expect(guestList.searchGuests("Dell Rath")).to.eql([guestList.guests[6]]);
    expect(guestList.searchGuests("dell rath")).to.eql([guestList.guests[6]]);
    expect(guestList.searchGuests("sch")).to.eql([guestList.guests[1], guestList.guests[2], guestList.guests[5], guestList.guests[13]]);
    expect(guestList.searchGuests("")).to.eql([]);
  });
});