// Checked / Not Tested

import { Api } from './api';

class FoodHasCharacteristic {
  constructor({a_food_id, a_char_id}) {
    this.a_food_id = a_food_id;
    this.a_char_id = a_char_id;
  }
}

class FoodHasCharacteristicApi{
  constructor() {}

  static get url() {
    return Api.baseUrl;
  }

  /*
  BODY:
    {
      "a_chars": [
        {
          "a_char_id": 1
        },
        {
          "a_char_id": 2
        }
      ]
    }
  RESULTADOS:
    200 - Se vinculó el char. con la comida especificada
      EJEMPLO:
      {
        "message": "Successfully added food has characteristic",
        "result": [
          {
            "a_food_id": 2,
            "a_char_id": 1
          },
          {
            "a_food_id": 2,
            "a_char_id": 2
          }
        ]
      }
    
    409 - El vinculo especificado ya existe
      EJEMPLO:
      {
        "message": "Conflict with foodHasCharacteristic",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": [
              {
                "a_food_id": 2,
                "a_char_id": 1
              }
            ]
          }
        ]
      }
  */
 
 static addIngredientsToFood(foodId, ingrs) {
  return Api.post(`${FoodHasIngredientApi.url}/food/${foodId}/ingredient`, {a_ingrs: ingrs});
}

  /*
  BODY:
    --
  RESULTADOS:
    200 - se vinculó la comida con la carac. de IDs especificados
      EJEMPLO:
      {
        "message": "Successfully added food has charactersitic",
        "result": [
          {
            "a_food_id": 1,
            "a_char_id": 2
          }
        ]
      }
    409 - Ya existe el vínculo solicitado
      EJEMPLO:
      {
        "message": "Conflict with foodHasCharacteristic",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": [
              {
                "a_food_id": 1,
                "a_char_id": 2
              }
            ]
          }
        ]
      }
  */
  static addCharacteristicToFood(foodId, charId) {
    return Api.post(`${FoodHasCharacteristicApi.url}/food/${foodId}/characteristic/${charId}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Se desvinculó la comida con la carac. de IDs especificados
    404 - No existe el vínculo especificado
  */
  static removeCharacteristicFromFood(foodId, charId) {
    return Api.delete(`${FoodHasCharacteristicApi.url}/food/${foodId}/characteristic/${charId}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Caracs. de la comida especificada
      EJEMPLO:
      {
        "message": "Successfully fetched characteristics by food id 1",
        "result": [
          {
            "a_char_id": 1,
            "a_char_name": "vegano"
          },
          {
            "a_char_id": 4,
            "a_char_name": "diabetico"
          }
        ]
      }
  */
  static getCharacteristicsByFood(foodId) {
    return Api.get(`${FoodHasCharacteristicApi.url}/food/${foodId}/characteristic`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Comidas que tienen la carac. especificada
      EJEMPLO:
      {
        "message": "Successfully fetched food by characteristics id 1",
        "result": [
          {
            "a_food_id": 1,
            "a_title": "Paloma al horno",
            "a_description": "Fina comida peruana",
            "a_score": "5.00",
            "a_image_url": (url),
            "a_rest": {
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
            "a_type": {
              "a_type_id": 2,
              "a_type_name": "hamburguesa",
              "a_image_url": (url)
            }
          }
        ]
      }
  */
  static getFoodsByCharacteristic(charId) {
    return Api.get(`${FoodHasCharacteristicApi.url}/characteristic/${charId}/food`);
  }
}

export { FoodHasCharacteristic, FoodHasCharacteristicApi };