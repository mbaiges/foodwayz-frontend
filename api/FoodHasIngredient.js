import { Api } from './api';

class FoodHasIngredient {
  constructor(data) {
    const {foodId, ingrId} = data;
    this.foodId = foodId;
    this.ingrId = ingrId;
  }
}

class FoodHasIngredientApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/food-ingredient`;
  }

  static add(obj) {
  return Api.post(FoodHasIngredientApi.url, obj);
  }

  static delete(id) {
    return Api.delete(`${FoodHasIngredientApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${FoodHasIngredientApi.url}/${id}`);
  }

}

export { FoodHasIngredient, FoodHasIngredientApi };