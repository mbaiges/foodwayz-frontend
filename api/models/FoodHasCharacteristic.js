export default class FoodHasCharacteristic {
  constructor(data) {
    const {foodId, charID} = data;
    this.foodId = foodId;
    this.charID = charID;
  }
}
