import { Api } from './api';

class Restaurant {
  constructor(data) {
    const {id, name, score, state, city, postalCode, address, restChainId} = data;
    if (id) {
      this.id = id;
    }
    this.name = name;
    if (score)
      this.score = score;
    else
      this.score = 0;
    this.state = state;
    this.city = city;
    this.postalCode = postalCode;
    this.address = address;
    if (restChainId)
      this.restChainId = restChainId;
  }
}

class RestaurantApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/restaurant`;
  }

  static add(rest) {
  return Api.post(RestaurantApi.url, rest);
  }

  static modify(rest) {
    return Api.put(`${RestaurantApi.url}/${rest.id}`, rest);
  }

  static delete(id) {
    return Api.delete(`${RestaurantApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${RestaurantApi.url}/${id}`);
  }

  static getAll() {
    return Api.get(RestaurantApi.url);
  }
}

export { Restaurant, RestaurantApi };