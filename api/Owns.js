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

  static add(owns) {
  return Api.post(`${OwnsApi.url}/owner/${owns.a_user_id}/restaurant/${owns.a_rest_id}`, owns);
  }

  static delete(id) {
    return Api.delete(`${OwnsApi.url}/owner/${owns.a_user_id}/restaurant/${owns.a_rest_id}`);
  }

  static getOwnerRestaurants(ownerId) {
    return Api.get(`${OwnsApi.url}/owner/${ownerId}/restaurant`);
  }

  static getRestaurantOwners(restId) {
    return Api.get(`${OwnsApi.url}/restaurant/${restId}/owner`);
  }
}

export { Owns, OwnsApi };