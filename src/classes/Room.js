class Room {
  constructor(object) {
    this.number = object.number
    this.roomType = object.roomType
    this.hasBidet = object.bidet
    this.bedSize = object.bedSize
    this.numBeds = object.numBeds
    this.costPerNight = Number((Math.round(object.costPerNight * 100) / 100))
  };
};

export default Room;