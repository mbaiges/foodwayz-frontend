// Checked / Not Tested

import { Api } from './api';

class Ingredient {
  constructor({a_ingr_id, a_ingr_name}) {
    if (a_ingr_id) {
      this.a_ingr_id = a_ingr_id;
    }
    this.a_ingr_name = a_ingr_name;
  }
}

class IngredientApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/ingredient`;
  }

  /*
  BODY:
    {
	    "name": "ketchup"
    }
  RESULTADOS:
    200 - el ingrediente agregado con su ID
      EJEMPLO:
      {
        "message": "Successfully added ingredient",
        "result": [
          {
            "a_ingr_id": 10,
            "a_ingr_name": "ketchup"
          }
        ]
      }
    
    409 - El nombre del body no es un string / ya existe un ingrediente con ese nombre
      EJEMPLO:
      {
        "message": "Conflict with ingredient",
        "description": [
          {
            "reason": "Cannot add ketchup",
            "conflicting_obj": [
              {
                "a_ingr_id": 10,
                "a_ingr_name": "ketchup"
              }
            ]
          }
        ]
      }
  */
  static add(ingr) {
    return Api.post(IngredientApi.url, ingr);
  }

  /*
  BODY:
    {
	    "name": "pepino"
    }
  RESULTADOS:
    200 - como quedó el ingrediente modificado
      EJEMPLO:
      {
        "result": [
          {
            "a_ingr_id": 3,
            "a_ingr_name": "pepino"
          }
        ]
      }
    
    404 - No se encontró el ingrediente con el ID enviado
    409 - El nombre del body no es un string / ya existe un ingrediente con ese nombre
      EJEMPLO:
      {
        "message": "Conflict with ingredient",
        "description": [
          {
            "reason": "Cannot put pepino to id: 5",
            "conflicting_obj": [
              {
                "a_ingr_id": 3,
                "a_ingr_name": "pepino"
              }
            ]
          }
        ]
      }
  */
  static modify(ingr) {
    return Api.put(`${IngredientApi.url}/${ingr.a_ingr_id}`, ingr);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - cantidad de ingredientes que se eliminaron (debería ser siempre 1)
      EJEMPLO:
      {
        "message": "Successfully deleted ingredient",
        "result": 1
      }
    
    404 - No se encontró el ingrediente con el ID enviado
  */
  static delete(id) {
    return Api.delete(`${IngredientApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Ingrediente con el ID enviado
      EJEMPLO:
      {
        "result": {
          "a_ingr_id": 1,
          "a_ingr_name": "tomate"
        }
      }
    
    404 - No se encontró el ingrediente con el ID enviado
  */
  static get(id) {
    return Api.get(`${IngredientApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - todos los ingredientes que hay cargados
      EJEMPLO:
      {
        "result": [
          {
            "a_ingr_id": 1,
            "a_ingr_name": "tomate"
          },
          {
            "a_ingr_id": 2,
            "a_ingr_name": "queso"
          }
        ]
      }
  */
  static getAll() {
    return Api.get(IngredientApi.url);
  }
}

export { Ingredient, IngredientApi };