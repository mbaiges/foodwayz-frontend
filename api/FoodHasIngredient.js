// Checked / Not Tested

import { Api } from './api';

class FoodHasIngredient {
  constructor({a_food_id, a_ingr_id}) {
    this.a_food_id = a_food_id;
    this.a_ingr_id = a_ingr_id;
  }
}

class FoodHasIngredientApi{
  constructor() {}

  static get url() {
    return Api.baseUrl;
  }

  static addIngredientToFood(foodId, ingrId) {
    return Api.post(`${FoodHasIngredientApi.url}/food/${foodId}/ingredient/${ingrId}`);
  }

  static removeIngredientFromFood(foodId, ingrId) {
    return Api.delete(`${FoodHasIngredientApi.url}/food/${foodId}/ingredient/${ingrId}`);
  }

  static getIngredientsByFood(foodId) {
    return Api.get(`${FoodHasIngredientApi.url}/food/${foodId}/ingredient`);
  }

  static getFoodsByIngredient(ingrId) {
    return Api.get(`${FoodHasIngredientApi.url}/ingredient/${ingrId}/food`);
  }
}

export { FoodHasIngredient, FoodHasIngredientApi };