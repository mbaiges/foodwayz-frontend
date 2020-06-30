// Checked / Not Tested

import { Api } from './api';

class Restaurant {
  constructor({a_rest_id, a_name, a_score, a_state, a_city, a_postal_code, a_address, a_rest_chain_id}) {
    if (a_rest_id) {
      this.a_rest_id = a_rest_id;
    }
    this.a_name = a_name;
    this.a_score = a_score;
    this.a_state = a_state;
    this.a_city = a_city;
    this.a_postal_code = a_postal_code;
    this.a_address = a_address;
    if (a_rest_chain_id)
      this.a_rest_chain_id = a_rest_chain_id;
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

  static getAll() {
    return Api.get(RestaurantApi.url);
  }

  static get(id) {
    return Api.get(`${RestaurantApi.url}/${id}`);
  }

  static delete(id) {
    return Api.delete(`${RestaurantApi.url}/${id}`);
  }

  static modify(rest) {
    return Api.put(`${RestaurantApi.url}/${rest.a_rest_id}`, rest);
  }

  static getImages(restId) {
    return Api.get(`${RestaurantApi.url}/${restId}/image`);
  }

  static addImage(restId, {a_image_url}) {
    return Api.post(`${RestaurantApi.url}/${restId}/image`, {a_image_url});
  }

  static getImage(restId, imageId) {
    return Api.get(`${RestaurantApi.url}/${restId}/image/${imageId}`);
  }

  static modifyImage(restId, imageId, {a_image_url}) {
    return Api.put(`${RestaurantApi.url}/${restId}/image/${imageId}`, {a_image_url});
  }

  static removeImage(restId, imageId) {
    return Api.delete(`${RestaurantApi.url}/${restId}/image/${imageId}`);
  }
}

export { Restaurant, RestaurantApi };