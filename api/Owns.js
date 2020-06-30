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
    409 - El usuario ya es owner del restaurant
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
    401 - El usuario no está registrado como owner
      EJEMPLO:
      {
        "message": "Unauthorize give restaurant ownership",
        "description": [
          "Not registered as owner"
        ]
      }
  */
  static add(restId) {
  return Api.post(`${OwnsApi.url}/owner/restaurant/${restId}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - se desvinculó el owner id con restaurant id
      EJEMPLO:
      {
        "message": "Successfully deleted ownership",
        "result": 1
      }
    404 - El usuario no tiene ownership del restaurant
      EJEMPLO:
      {
        "message": "Unable to find ownership of the restaurant with id 1"
      }
    401 - El usuario no está registrado como owner
      EJEMPLO:
      {
        "message": "Unauthorize give restaurant ownership",
        "description": [
          "Not registered as owner"
        ]
      }
  */ 
  static delete(restId) {
    return Api.delete(`${OwnsApi.url}/owner/restaurant/${restId}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - restaurants que posee el owner
      EJEMPLO:
      {
        "message": "Successfully fetched restaurants by owner id 1",
        "result": [
          {
            "a_rest_id": 1,
            "a_name": "McDonalds del obelisco",
            "a_score": "1.20",
            "a_state": "BSAS",
            "a_city": "CABA",
            "a_postal_code": "1234",
            "a_address": "el obelisco 69",
            "a_rest_chain_id": 1,
            "a_created_at": "2020-06-30T17:37:58.300Z"
          },
          {
            "a_rest_id": 3,
            "a_name": "Kansas de libertador",
            "a_score": "1.20",
            "a_state": "BSAS",
            "a_city": "CABA",
            "a_postal_code": "1313",
            "a_address": "libertador 1221",
            "a_rest_chain_id": 2,
            "a_created_at": "2020-06-30T17:37:58.300Z"
          }
        ]
      }
  */
  static getMyRestaurants() {
    return Api.get(`${OwnsApi.url}/owner/restaurant`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Owners del restaurant
      EJEMPLO:
      {
        "message": "Successfully fetched owners by restaurant id 1",
        "result": [
          {
            "a_user_id": 1,
            "a_name": "user1",
            "a_email": "user1@email.com"
          },
          {
            "a_user_id": 2,
            "a_name": "user2",
            "a_email": "user2@email.com"
          }
        ]
      }
  */
  static getRestaurantOwners(restId) {
    return Api.get(`${OwnsApi.url}/restaurant/${restId}/owner`);
  }
}

export { Owns, OwnsApi };