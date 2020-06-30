// Checked / Not Tested

import { Api } from './api';

class Owner {
  constructor({a_user_id, a_premium_level}) {
    this.a_user_id = a_user_id;
    this.a_premium_level = a_premium_level;
  }
}

class OwnerApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/owner`;
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    --
  RESULTADOS:
    200 - Datos del ownership
      EJEMPLO:
      {
        "message": "Successfully added owner",
        "result": [
          {
            "a_user_id": 1,
            "a_premium_level": 0
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
  static makeMeOwner() {
    return Api.post(OwnerApi.url);
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    --
  RESULTADOS:
    200 - El usuario ya no es owner
      EJEMPLO:
      {
        "message": "Successfully deleted owner",
        "result": 0
      }
    409 - El usuario no era owner
      EJEMPLO:
      {
        "message": "Conflict with owner",
        "description": [
          {
            "reason": "not an owner",
            "conflicting_obj": null
          }
        ]
      }
    500 - Falló la acción solicitada (probablemente no haya comunicación con la BD)
  */
  static removeMyOwnership() {
    return Api.delete(OwnerApi.url);
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    {
      "a_premium_level": 2
    }
  RESULTADOS:
    200 - Cantidad de usuarios que se updatearon (debería ser 1 siempre)
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
  static updatePremiumStatus({a_premium_level}) {
    return Api.get(OwnerApi.url, {a_premium_level});
  }
}

export { Owner, OwnerApi };