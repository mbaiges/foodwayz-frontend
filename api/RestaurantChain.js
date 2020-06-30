import { Api } from './api';

class RestaurantChain {
  constructor({a_rest_chain_id, a_name, a_score, a_image_url}) {
    if (a_rest_chain_id)
      this.a_rest_chain_id = a_rest_chain_id;
    this.a_name = a_name;
    if (a_score)
      this.a_score = a_score;
    else
      this.a_score = 0;
    this.a_image_url = a_image_url;
  }
}

class RestaurantChainApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/restaurant_chain`;
  }

  static add(rest_chain) {
  return Api.post(RestaurantChainApi.url, rest_chain);
  }

  static modify(rest_chain) {
    return Api.put(`${RestaurantChainApi.url}/${rest_chain.a_rest_chain_id}`, rest_chain);
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