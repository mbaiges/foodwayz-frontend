// Checked / Not Tested

import { Api } from './api';

class Characteristic {
  constructor({a_char_id, a_char_name}) {
    if (a_char_id) {
      this.a_char_id = a_char_id;
    }
    this.a_char_name = a_char_name;
  }
}

class CharacteristicApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/characteristic`;
  }

  /*
  BODY:
    {
      "name": "vegano"
    }
  RESULTADOS:
    200 - Carac. agregada con su ID
      EJEMPLO:
      {
        "message": "Successfully added characteristic",
        "result": [
          {
            "a_char_id": 1,
            "a_char_name": "vegano"
          }
        ]
      }
    
    400 - El nombre del body no es un string
    409 - La característica ya existe
      EJEMPLO:
      {
        "message": "Conflict with characteristic",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": [
              {
                "a_char_id": 1,
                "a_char_name": "vegano"
              }
            ]
          }
        ]
      }
  */
  static add(char) {
    return Api.post(CharacteristicApi.url, char);
  }

  /*
  BODY:
    {
      "name": "vergano"
    }
  RESULTADOS:
    200 - Como quedó la carac. modificada
      EJEMPLO:
      {
        "message": "Successfully modified characteristic",
        "result": [
          {
            "a_char_id": 1,
            "a_char_name": "vergano"
          }
        ]
      }
    
    400 - El nombre del body no es un string
    404 - No se encontró la carac. con el ID enviado
    409 - La característica ya existe
      EJEMPLO:
      {
        "message": "Conflict with characteristic",
        "description": [
          {
            "reason": "already exists",
            "conflicting_obj": [
              {
                "a_char_id": 3,
                "a_char_name": "celiaco"
              }
            ]
          }
        ]
      }
  */
  static modify(char) {
    return Api.put(`${CharacteristicApi.url}/${char.a_char_id}`, char);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Cantidad de características eliminadas (debería ser siempre 1)
      EJEMPLO:
      {
        "message": "Successfully deleted characteristic",
        "result": 1
      }

    404 - No se encontró la carac. con el ID enviado
  */
  static delete(id) {
    return Api.delete(`${CharacteristicApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Característica solicitada
      EJEMPLO:
      {
        "message": "Successfully fetched characteristic",
        "result": {
          "a_char_id": 1,
          "a_char_name": "vegano"
        }
      }

    404 - No se encontró la carac. con el ID enviado
  */
  static get(id) {
    return Api.get(`${CharacteristicApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - todas las caracteristicas
      EJEMPLO:
      {
        "message": "Successfully fetched characteristics",
        "result": [
          {
            "a_char_id": 1,
            "a_char_name": "vegano"
          },
          {
            "a_char_id": 2,
            "a_char_name": "vegetariano"
          },
          {
            "a_char_id": 3,
            "a_char_name": "celiaco"
          },
          {
            "a_char_id": 4,
            "a_char_name": "diabetico"
          }
        ]
      }
  */
  static getAll() {
    return Api.get(CharacteristicApi.url);
  }
}

export { Characteristic, CharacteristicApi };

