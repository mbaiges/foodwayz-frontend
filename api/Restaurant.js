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

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    {
      "a_name": "Pizzería los hijos de puta",
      "a_state": "alabama",
      "a_city": "Mexico City",
      "a_postal_code": "200",
      "a_rest_chain_id": null,
      "a_address": "calle falsa 123"
    }
  RESULTADOS:
    200 - Restaurant agregado
      EJEMPLO:
      {
        "message": "Successfully added restaurant",
        "result": [
          {
            "a_rest_id": 9,
            "a_name": "Pizzería los hijos de puta",
            "a_score": null,
            "a_state": "alabama",
            "a_city": "Mexico City",
            "a_postal_code": "200",
            "a_address": "calle falsa 123",
            "a_rest_chain_id": null,
            "a_created_at": "2020-06-30T21:41:30.027Z"
          }
        ]
      }
    
    401 - El usuario no es owner
    404 - No existe el rest_chain_id especificado
    409 - El restaurant ya existe
      EJEMPLO:
      {
        "message": "Conflict with restaurant",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": {
              "a_rest_id": 9,
              "a_name": "Pizzería los hijos de puta",
              "a_score": null,
              "a_state": "alabama",
              "a_city": "Mexico City",
              "a_postal_code": "200",
              "a_address": "calle falsa 123",
              "a_rest_chain_id": null,
              "a_created_at": "2020-06-30T21:41:30.027Z"
            }
          }
        ]
      }
  */
  static add(rest) {
    return Api.post(RestaurantApi.url, rest);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Todos los restaurants
      EJEMPLO:
      {
        "message": "Successfully fetched restaurant",
        "result": [
          {
            "a_rest_id": 1,
            "a_name": "McDonalds del obelisco",
            "a_score": "1.20",
            "a_state": "BSAS",
            "a_city": "CABA",
            "a_postal_code": "1234",
            "a_address": "el obelisco 69",
            "a_created_at": "2020-06-30T18:30:32.338Z",
            "a_rest_chain": {
              "a_rest_chain_id": 1,
              "a_name": "McDonalnds",
              "a_score": 4,
              "a_image_url": (url)
            }
          },
          {
            "a_rest_id": 6,
            "a_name": "tacos locos",
            "a_score": "4.00",
            "a_state": "BSAS",
            "a_city": "CABA",
            "a_postal_code": "1323",
            "a_address": "pilar 1221",
            "a_rest_chain_id": null,
            "a_created_at": "2020-06-30T18:30:32.338Z"
          },
        ]
      }
  */
  static getAll() {
    return Api.get(RestaurantApi.url);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - restaurant con ID especificado
      EJEMPLO:
      {
        "message": "Successfully fetched restaurant",
        "result": {
          "a_rest_id": 1,
          "a_name": "McDonalds del obelisco",
          "a_score": "1.20",
          "a_state": "BSAS",
          "a_city": "CABA",
          "a_postal_code": "1234",
          "a_address": "el obelisco 69",
          "a_created_at": "2020-06-30T18:30:32.338Z",
          "a_rest_chain": {
            "a_rest_chain_id": 1,
            "a_name": "McDonalnds",
            "a_score": 4,
            "a_image_url": (url)
          }
        }
      }
    
    404 - No se encontró el restaurant con ID especificado
  */
  static get(id) {
    return Api.get(`${RestaurantApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Se eliminó el restaurant con ID especificado
    404 - No se encontró el restaurant con ID especificado
  */
  static delete(id) {
    return Api.delete(`${RestaurantApi.url}/${id}`);
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    {
      "a_name": "Pizzería mi Casa",
      "a_score": 2,
      "a_rest_chain_id": null
    }
  RESULTADOS:
    200 - Se modificó el restaurant con ID especificado
    400 - No se encontró el restaurant con ID especificado
    401 - El user no es dueño del rest
  */
  static modify(rest) {
    return Api.put(`${RestaurantApi.url}/${rest.a_rest_id}`, rest);
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    {
      "a_premium_level": 2
    }
  RESULTADOS:
    200 - Cantidad de restaurants que se updatearon (debería ser 1 siempre)
      EJEMPLO:
      {
        "message": "Successfully modified premium level",
        "result": 1
      }
    400 - el valor de premium en el body no es integer
      EJEMPLO:
      {
        "message": "Bad request at premium level with id 1",
        "description": [
          {
            "params": "asdasd"
          }
        ]
      }
    404 - El user no es owner
  */
 static updatePremiumStatus(id, a_premium_level) {
  return Api.put(`${RestaurantApi.url}/${id}`, {a_premium_level});
}

  /*
  BODY:
    --
  RESULTADOS:
    200 - Comidas del restaurant especificado
    404 - No hay comidas del restaurant especificado
  */
  static getFoods(restId) {
    return Api.get(`${RestaurantApi.url}/${restId}/food`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Imágenes del restaurant especificado
    404 - No hay imágenes del restaurant especificado
  */
  static getImages(restId) {
    return Api.get(`${RestaurantApi.url}/${restId}/image`);
  }

  /*
  BODY:
    {
      a_images: [
        {
          "a_image_url": "url1",
          "a_image_extra": "extra1"
        },
        {
          "a_image_url": "url2",
          "a_image_extra": "extra2"
        },
    }
  RESULTADOS:
    200 - Imagen agregada al restaurant especificado
    401 - El user no es dueño del restaurant
    404 - No hay imágenes del restaurant especificado
  */
  static addImages(restId, image) {
    return Api.post(`${RestaurantApi.url}/${restId}/image`, image);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Imagen especificada del restaurant especificado
      EJEMPLO:
      {
        "message": "Successfully fetched restaurant image",
        "result": [
          {
            "a_image_id": 1,
            "a_image_url": (url)
          }
        ]
      }

    404 - El restaurant o la imagen especificados no existen
  */
  static getImage(restId, imageId) {
    return Api.get(`${RestaurantApi.url}/${restId}/image/${imageId}`);
  }

  /*
  BODY:
    {
      "a_image_url": (url)
    }
  RESULTADOS:
    200 - Imagen modificada del restaurant especificado
      EJEMPLO:
      {
        "message": "Successfully fetched restaurant image",
        "result": [
          {
            "a_image_id": 1,
            "a_image_url": (url)
          }
        ]
      }
    
    401 - El user no es owner del rest
    404 - La imagen especificados no existe
  */
  static modifyImage(restId, imageId, image) {
    return Api.put(`${RestaurantApi.url}/${restId}/image/${imageId}`, image);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Imagen eliminada del restaurant especificado
    401 - El user no es owner del rest
    404 - La imagen especificados no existe
  */
  static removeImage(restId, imageId) {
    return Api.delete(`${RestaurantApi.url}/${restId}/image/${imageId}`);
  }
}

export { Restaurant, RestaurantApi };