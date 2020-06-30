// Checked / Not Tested

import { Api } from './api';

class Ingredient {
  constructor({a_ingr_id, a_ingr_name}) {
    if (a_ingr_id) {
      this.a_ingr_id = a_ingr_id;
    }
    this.a_ingr_name = a_ingr_name;
  }
}

class IngredientApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/ingredient`;
  }

  static add(ingr) {
  return Api.post(IngredientApi.url, ingr);
  }

  static modify(ingr) {
    return Api.put(`${IngredientApi.url}/${ingr.a_ingr_id}`, ingr);
  }

  static delete(id) {
    return Api.delete(`${IngredientApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${IngredientApi.url}/${id}`);
  }

  static getAll() {
    return Api.get(IngredientApi.url);
  }
}

export { Ingredient, IngredientApi };