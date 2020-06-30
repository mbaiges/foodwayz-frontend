// Checked / Not Tested

import { Api } from './api';

class Owns {
  constructor({a_user_id, a_rest_id}) {
    this.a_user_id = a_user_id;
    this.a_rest_id = a_rest_id;
  }
}

class OwnsApi{
  constructor() {}

  static get url() {
    return Api.baseUrl;
  }

  
  static add(restId) {
  return Api.post(`${OwnsApi.url}/owner/restaurant/${restId}`);
  }

  static delete(restId) {
    return Api.delete(`${OwnsApi.url}/owner/restaurant/${restId}`);
  }

  static getMyRestaurants() {
    return Api.get(`${OwnsApi.url}/owner/restaurant`);
  }

  static getRestaurantOwners(restId) {
    return Api.get(`${OwnsApi.url}/restaurant/${restId}/owner`);
  }
}

export { Owns, OwnsApi };