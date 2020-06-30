// Checked / Not Tested

import { Api } from './api';

class Food {
  constructor({a_food_id, a_title, a_description, a_score, a_type_id, a_rest_id, a_image_url}) {
    if (a_food_id) {
      this.a_food_id = a_food_id;
    }
    this.a_title = a_title
    this.a_description = a_description;
    this.a_score = a_score;
    this.a_type_id = a_type_id;
    this.a_rest_id = a_rest_id;
    this.a_image_url = a_image_url;
  }
}

class FoodApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/food`;
  }
  
  /*
  BODY:
    {
      "a_title": "Fideos a la crema",
      "a_description": "Fideos con crema de leche (de toro)",
      "a_score": 3 (puede ser null),
      "a_type_id": 1,
      "a_rest_id": 1,
      "a_image_url": url (puede ser null)
    }
  RESULTADOS:
    200 - se agregó la comida la comida
      EJEMPLO:
      {
        "message": "Successfully added food",
        "result": [
          {
            "a_food_id": 14,
            "a_title": "Fideos a la crema",
            "a_description": "Fideos con crema de leche (de toro)",
            "a_score": "3.00",
            "a_type_id": 1,
            "a_rest_id": 1,
            "a_image_url": null
          }
        ]
      }
    400 - Problemas en los parámetros enviados
      EJEMPLO:
      {
        "message": "Bad request at food with id a_description",
        "description": [
          {
            "params": {
              "a_description": 4
            }
          }
        ]
      }
  */
  static add(food) {
    return Api.post(FoodApi.url, food);
  }

  /*
  BODY:
    {
      "a_title": "Paloma al horno",
      "a_description": "Fina comida peruana",
      "a_score": 5 (opcional),
      "a_type_id": 2 (opcional),
      "a_image_url": url (opcional)
    }
  RESULTADOS:
    200 - se modificó la comida con el ID enviado
    404 - No se encontró la comida con el ID enviado
  */
  static modify(food) {
    return Api.put(`${FoodApi.url}/${food.a_food_id}`, food);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - se borró la comida con el ID enviado
    404 - No se encontró la comida con el ID enviado
  */
  static delete(id) {
    return Api.delete(`${FoodApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Comida solicitada
      EJEMPLO:
      {
        "message": "Successfully fetched food",
        "result": {
          "a_food_id": 3,
          "a_title": "Kangreburger",
          "a_description": "La mejor debajo del mar. Formula SECRETA!",
          "a_score": "5.00",
          "a_image_url": (url),
          "a_rest": {
            "a_rest_id": 8,
            "a_name": "Crustacio Cascarudo",
            "a_score": "2.00",
            "a_state": "Fondo De Bikini",
            "a_city": "-",
            "a_postal_code": "1234",
            "a_address": "psherman calle wallaby 42",
            "a_rest_chain_id": null,
            "a_created_at": "2020-06-30T17:37:58.300Z"
          },
          "a_type": {
            "a_type_id": 2,
            "a_type_name": "hamburguesa",
            "a_image_url": (url)
          }
        }
      }

    404 - No se encontró la comida con el ID enviado
  */
  static get(id) {
    return Api.get(`${FoodApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Todas las comidas cargadas en la DB
      EJEMPLO:
      {
        "message": "Successfully fetched foods",
        "result": [
          {
            "a_food_id": 1,
            "a_title": "BigMac",
            "a_description": "Tremenda Glucemia",
            "a_score": "3.00",
            "a_image_url": (url),
            "a_rest": {
              "a_rest_id": 1,
              "a_name": "McDonalds del obelisco",
              "a_score": "1.20",
              "a_state": "BSAS",
              "a_city": "CABA",
              "a_postal_code": "1234",
              "a_address": "el obelisco 69",
              "a_created_at": "2020-06-30T17:37:58.300Z",
              "a_rest_chain": {
                "a_rest_chain_id": 1,
                "a_name": "McDonalnds",
                "a_score": 4,
                "a_image_url": (url)
              }
            },
            "a_type": {
              "a_type_id": 2,
              "a_type_name": "hamburguesa",
              "a_image_url": (url)
            }
          },
          {
            "a_food_id": 5,
            "a_title": "Ensalada De Kansas",
            "a_description": "Cuando se acaban los pancitos, RIP.",
            "a_score": "3.00",
            "a_image_url": (url),
            "a_rest": {
              "a_rest_id": 3,
              "a_name": "Kansas de libertador",
              "a_score": "1.20",
              "a_state": "BSAS",
              "a_city": "CABA",
              "a_postal_code": "1313",
              "a_address": "libertador 1221",
              "a_created_at": "2020-06-30T17:37:58.300Z",
              "a_rest_chain": {
                "a_rest_chain_id": 2,
                "a_name": "Kansas",
                "a_score": 5,
                "a_image_url": (url)
              }
            },
            "a_type": {
              "a_type_id": 4,
              "a_type_name": "ensalada",
              "a_image_url": (url)
            }
          }
        ]
      }
  */
  static getAll() {
    return Api.get(FoodApi.url);
  }
}

export { Food, FoodApi };