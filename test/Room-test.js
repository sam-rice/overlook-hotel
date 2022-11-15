import chai from "chai";
const expect = chai.expect;
import Room from "../src/classes/Room";
import rooms from "./test-data/rooms-test-data";

describe('Room Class', function() {
  let room;

  this.beforeEach(() => {
    room = new Room(rooms[0]);
  });

  it('should be an instance of the Room Class', function() {
    expect(room).to.be.an.instanceOf(Room);
  });
 
  it('should have properties for a room number, room type, whether or not it has a bidet, bed size, number of beds, and cost per night.', function() {
    expect(room).to.haveOwnProperty("number");
    expect(room).to.haveOwnProperty("roomType");
    expect(room).to.haveOwnProperty("hasBidet");
    expect(room).to.haveOwnProperty("bedSize");
    expect(room).to.haveOwnProperty("numBeds");
    expect(room).to.haveOwnProperty("costPerNight");
  });

  it('should have properties with properly-formatted values.', function() {
    expect(room.number).to.eql(1);
    expect(room.roomType).to.eql("residential suite");
    expect(room.hasBidet).to.eql(true);
    expect(room.bedSize).to.eql("queen");
    expect(room.numBeds).to.eql(1);
    expect(room.costPerNight).to.eql(358.40);
  });
});