import { Api } from './api';

class Food {
  constructor(data) {
    const {id, desc, score, type, restId} = data;
    if (id) {
      this.id = id;
    }
    this.desc = desc;
    if (score)
      this.score = score;
    else
      this.score = 0;
    this.type = type;
    this.restId = restId
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
    return Api.put(`${FoodApi.url}/${Api.id}`, food);
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