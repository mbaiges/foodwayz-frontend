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

  /*
  BODY:
    --
  RESULTADOS:
    200 - se vinculó el owner id con restaurant id
      EJEMPLO:
      {
        "message": "Successfully added owns",
        "result": [
          {
            "a_user_id": 1,
            "a_rest_id": 1
          }
        ]
      }
    409 - El usuario ya es owner
      EJEMPLO:
      {
        "message": "Conflict with owner",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": {
              "a_user_id": 1,
              "a_premium_level": 0
            }
          }
        ]
      }
    500 - Falló la acción solicitada (probablemente no haya comunicación con la BD)
  */
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