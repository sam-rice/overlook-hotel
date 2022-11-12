class Room {
  constructor(object) {
    this.number = object.number
    this.roomType = object.roomType
    this.hasBidet = object.bidet
    this.bedSize = object.bedSize
    this.numBeds = object.numBeds
    this.costPerNight = (Math.round(object.costPerNight * 100) / 100).toFixed(2)
  };
};

export default Room;