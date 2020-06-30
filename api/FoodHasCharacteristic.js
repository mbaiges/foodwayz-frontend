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

  static add(obj) {
  return Api.post(`${FoodHasCharacteristicApi.url}/${id}`, obj);
  }

  static delete(id) {
    return Api.delete(`${FoodHasCharacteristicApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${FoodHasCharacteristicApi.url}/${id}`);
  }
}

export { FoodHasCharacteristic, FoodHasCharacteristicApi };