import { Api } from './api';

class FoodHasCharacteristic {
  constructor({a_food_id, a_char_id}) {
    this.a_food_id = a_food_id;
    this.a_char_id = a_char_id;
  }
}

class FoodHasCharacteristicApi{
  constructor() {}

  static get url() {
    return Api.baseUrl;
  }

  static addCharToFood(foodId, charId) {
    return Api.post(`${FoodHasCharacteristicApi.url}/food/${foodId}/characteristic/${charId}`);
  }

  static removeCharFromFood(foodId, charId) {
    return Api.delete(`${FoodHasCharacteristicApi.url}/food/${foodId}/characteristic/${charId}`);
  }

  static get(id) {
    return Api.get(`${FoodHasCharacteristicApi.url}/food/${foodId}/characteristic`);
  }
}

export { FoodHasCharacteristic, FoodHasCharacteristicApi };