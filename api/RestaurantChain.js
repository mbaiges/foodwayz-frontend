import { Api } from './api';

class RestaurantChain {
  constructor(data) {
    const {id, name, score} = data;
    
    this.id = id;
    this.name = name;
    if (score)
      this.score = score;
    else
      this.score = 0;
  }
}

class RestaurantChainApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/restaurant-chain`;
  }

  static add(rest_chain) {
  return Api.post(RestaurantChainApi.url, rest_chain);
  }

  static modify(rest_chain) {
    return Api.put(`${RestaurantChainApi.url}/${rest_chain.id}`, rest_chain);
  }

  static delete(id) {
    return Api.delete(`${RestaurantChainApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${RestaurantChainApi.url}/${id}`);
  }

  static getAll() {
    return Api.get(RestaurantChainApi.url);
  }
}

export { RestaurantChain, RestaurantChainApi };