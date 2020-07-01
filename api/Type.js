// Checked / Not Tested

import { Api } from './api';

class Type {
  constructor({a_type_id, a_type_name}) {
    if (a_type_id) {
      this.a_type_id = a_type_id;
    }
    this.a_type_name = a_type_name;
  }
}

class TypeApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/type`;
  }

  /*
  BODY:
    {
      "a_type_name": "sopa",
      "a_image_url": null
    }
  RESULTADOS:
    200 - Se agregó el tipo
      EJEMPLO:
      {
        "message": "Successfully added type",
        "result": [
          {
            "a_type_id": 8,
            "a_type_name": "sopa",
            "a_image_url": null
          }
        ]
      }

    400 - Mal pasado algún parámentro
    409 - Ya existe el tipo
      EJEMPLO:
      {
        "message": "Conflict with type",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": [
              {
                "a_type_id": 8,
                "a_type_name": "sopa",
                "a_image_url": null
              }
            ]
          }
        ]
      }
  */
  static add(type) {
    return Api.post(TypeApi.url, type);
  }

  /*
  BODY:
    {
      "a_type_name": "sopita",
      "a_image_url": null
    }
  RESULTADOS:
    200 - Se Modificó el tipo
    400 - Mal pasado algún parámentro
    404 - No existe el tipo especificado
  */
  static modify(type) {
    return Api.put(`${TypeApi.url}/${type.a_type_id}`, type);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Se eliminó el tipo
    404 - No existe el tipo especificado
  */
  static delete(id) {
    return Api.delete(`${TypeApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - El tipo especificado
      EJEMPLO:
      {
        "message": "Successfully fetched type",
        "result": {
          "a_type_id": 3,
          "a_type_name": "pasta",
          "a_image_url": (url)
        }
      }
    404 - No existe el tipo especificado
  */
  static get(id) {
    return Api.get(`${TypeApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Tipos existentes
      EJEMPLO:
      {
        "message": "Successfully fetched types",
        "result": [
          {
            "a_type_id": 1,
            "a_type_name": "guiso",
            "a_image_url": (url)
          },
          {
            "a_type_id": 2,
            "a_type_name": "hamburguesa",
            "a_image_url": (url)
          },
          {
            "a_type_id": 4,
            "a_type_name": "ensalada",
            "a_image_url": (url)
          }
        ]
      }
  */
  static getAll() {
    return Api.get(TypeApi.url);
  }
}

export { Type, TypeApi };