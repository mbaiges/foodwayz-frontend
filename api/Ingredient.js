import { Api } from './api';

class Ingredient {
  constructor(data) {
    const {id, name} = data;
    if (id) {
      this.id = id;
    }
    this.name = name;
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
    return Api.put(`${IngredientApi.url}/${ingr.id}`, ingr);
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