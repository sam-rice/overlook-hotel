class Room {
  constructor(object) {
    this.number = object.number
    this.roomType = object.roomType
    this.hasBidet = object.bidet
    this.bedSize = object.bedSize
    this.numBeds = object.numBeds
    this.costPerNight = object.costPerNight
  };
};

export default Room;