import { Api } from './api';

class FoodHasCharacteristic {
  constructor(data) {
    const {foodId, charID} = data;
    this.foodId = foodId;
    this.charID = charID;
  }
}

class FoodHasCharacteristicApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/food-charasteristic`;
  }

  static add(obj) {
  return Api.post(FoodHasCharacteristicApi.url, obj);
  }

  static delete(id) {
    return Api.delete(`${FoodHasCharacteristicApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${FoodHasCharacteristicApi.url}/${id}`);
  }
}

export { FoodHasCharacteristic, FoodHasCharacteristicApi };