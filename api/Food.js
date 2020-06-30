// Checked / Not Tested

import { Api } from './api';

class Food {
  constructor({a_food_id, a_title, a_description, a_score, a_type_id, a_rest_id, a_image_url}) {
    if (a_food_id) {
      this.a_food_id = a_food_id;
    }
    this.a_title = a_title
    this.a_description = a_description;
    this.a_score = a_score;
    this.a_type_id = a_type_id;
    this.a_rest_id = a_rest_id;
    this.a_image_url = a_image_url;
  }
}

class FoodApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/food`;
  }

  static add(food) {
  return Api.post(FoodApi.url, food);
  }

  static modify(food) {
    return Api.put(`${FoodApi.url}/${food.a_food_id}`, food);
  }

  static delete(id) {
    return Api.delete(`${FoodApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${FoodApi.url}/${id}`);
  }

  static getAll() {
    return Api.get(FoodApi.url);
  }
}

export { Food, FoodApi };