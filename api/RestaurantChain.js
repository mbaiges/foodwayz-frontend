// Checked / Not Tested

import { Api } from './api';

class RestaurantChain {
  constructor({a_rest_chain_id, a_name, a_score, a_image_url}) {
    if (a_rest_chain_id)
      this.a_rest_chain_id = a_rest_chain_id;
    this.a_name = a_name;
    this.a_score = a_score;
    this.a_image_url = a_image_url;
  }
}

class RestaurantChainApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/restaurant_chain`;
  }

  /*
  BODY:
    {
      "a_name": "Starbucks",
      "a_score": null,
      "a_img_url": null
    }
  RESULTADOS:
    200 - Se agregó la cadena
      EJEMPLO:
      {
        "message": "Successfully added restaurant chain",
        "result": [
          {
            "a_rest_chain_id": 3,
            "a_name": "starbucks",
            "a_score": null,
            "a_image_url": null
          }
        ]
      }
    
    400 - Mal pasado algún parámetro
      EJEMPLO:
      {
        "message": "Bad request at restaurant chain with id a_name,a_score",
        "description": [
          {
            "params": {
              "a_name": 123,
              "a_score": "null"
            }
          }
        ]
      }

    409 - Ya existe la cadena
      EJEMPLO:
      {
        "message": "Conflict with restaurant chain",
        "description": [
          {
            "reason": "Ya existe la llave (a_name)=(starbucks).",
            "conflicting_obj": null
          }
        ]
      }
  */
  static add(rest_chain) {
  return Api.post(RestaurantChainApi.url, rest_chain);
  }

  /*
  BODY:
    {
      "a_name": "Starbucks",
      "a_score": 3.5,
      "a_img_url": null
    }
  RESULTADOS:
    200 - Se modificó la cadena
      EJEMPLO:
      {
        "message": "Successfully modified restaurant chain",
        "result": [
          {
            "a_rest_chain_id": 3,
            "a_name": "starbucks",
            "a_score": 3,
            "a_image_url": null
          }
        ]
      }
    
    400 - Mal pasado algún parámetro
      EJEMPLO:
      {
        "message": "Bad request at restaurant chain with id a_name,a_score",
        "description": [
          {
            "params": {
              "a_name": 123,
              "a_score": "null"
            }
          }
        ]
      }

    404 - No existe la cadena
  */
  static modify(rest_chain) {
    return Api.put(`${RestaurantChainApi.url}/${rest_chain.a_rest_chain_id}`, rest_chain);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Se eliminó la cadena 
    404 - No existe la cadena
  */
  static delete(id) {
    return Api.delete(`${RestaurantChainApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Cadena especificada
      EJEMPLO:
      {
        "message": "Successfully fetched t_restaurant_chain",
        "result": [
          {
            "a_rest_chain_id": 2,
            "a_name": "Kansas",
            "a_score": 5,
            "a_image_url": (url)
          }
        ]
      }
    
    404 - No existe la cadena
  */
  static get(id) {
    return Api.get(`${RestaurantChainApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Cadenas existentes
      EJEMPLO:
      {
        "message": "Successfully fetched restaurant chain",
        "result": [
          {
            "a_rest_chain_id": 1,
            "a_name": "McDonalnds",
            "a_score": 4,
            "a_image_url": (url)
          },
          {
            "a_rest_chain_id": 2,
            "a_name": "Kansas",
            "a_score": 5,
            "a_image_url": (url)
          }
        ]
      }
  */
  static getAll() {
    return Api.get(RestaurantChainApi.url);
  }
}

export { RestaurantChain, RestaurantChainApi };