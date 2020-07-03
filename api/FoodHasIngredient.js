// Checked / Not Tested

import { Api } from './api';

class FoodHasIngredient {
  constructor({a_food_id, a_ingr_id}) {
    this.a_food_id = a_food_id;
    this.a_ingr_id = a_ingr_id;
  }
}

class FoodHasIngredientApi{
  constructor() {}

  static get url() {
    return Api.baseUrl;
  }

  /*
  BODY:
    {
      "a_ingrs": [
        {
          "a_ingr_id": 1
        },
        {
          "a_ingr_id": 2
        }
      ]
    }
  RESULTADOS:
    200 - Se vinculó el ingr. con la comida especificada
      EJEMPLO:
      {
        "message": "Successfully added food has ingredient",
        "result": [
          {
            "a_food_id": 2,
            "a_ingr_id": 1
          },
          {
            "a_food_id": 2,
            "a_ingr_id": 2
          }
        ]
      }
    
    409 - El vinculo especificado ya existe
      EJEMPLO:
      {
        "message": "Conflict with foodHasIngredient",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": [
              {
                "a_food_id": 2,
                "a_ingr_id": 1
              }
            ]
          }
        ]
      }
  */
 static addIngredientsToFood(foodId, a_ingrs) {
  return Api.post(`${FoodHasIngredientApi.url}/food/${foodId}/ingredient`, {a_ingrs});
}

  /*
  BODY:
    --
  RESULTADOS:
    200 - Se vinculó el ingr. con la comida especificada
      EJEMPLO:
      {
        "message": "Successfully added food has ingredient",
        "result": [
          {
            "a_food_id": 2,
            "a_ingr_id": 1
          }
        ]
      }
    
    409 - El vinculo especificado ya existe
      EJEMPLO:
      {
        "message": "Conflict with foodHasIngredient",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": [
              {
                "a_food_id": 2,
                "a_ingr_id": 1
              }
            ]
          }
        ]
      }
  */
  static addIngredientToFood(foodId, ingrId) {
    return Api.post(`${FoodHasIngredientApi.url}/food/${foodId}/ingredient/${ingrId}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Se desvinculó el ingr. con la comida especificada
    404 - El vinculo especificado no existe
  */
  static removeIngredientFromFood(foodId, ingrId) {
    return Api.delete(`${FoodHasIngredientApi.url}/food/${foodId}/ingredient/${ingrId}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Ingredientes de la comida especificada
      EJEMPLO:
      {
        "message": "Successfully fetched ingredients by food id 2",
        "result": [
          {
            "a_ingr_id": 11,
            "a_ingr_name": "tortilla"
          }
        ]
      }
  */
  static getIngredientsByFood(foodId) {
    return Api.get(`${FoodHasIngredientApi.url}/food/${foodId}/ingredient`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Comidas que tienen el ingr. especificado
      EJEMPLO:
      {
        "message": "Successfully fetched food by ingredients id 1",
        "result": [
          {
            "a_food_id": 6,
            "a_title": "Ensalada Blen",
            "a_description": "Aglomerado de hojas verdes acompañado de variedad de pimientos exoticos del himalaya.",
            "a_score": "4.00",
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
              "a_created_at": "2020-06-30T18:30:32.338Z"
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
  static getFoodsByIngredient(ingrId) {
    return Api.get(`${FoodHasIngredientApi.url}/ingredient/${ingrId}/food`);
  }
}

export { FoodHasIngredient, FoodHasIngredientApi };