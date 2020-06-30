// Checked / Not Tested

import { Api } from './api';

class User {
  constructor(data) {
    const { id, name, email, password } = data;
    if (id) {
      this.id = id;
    }
    if (name) {
      this.name = name;
    }
    this.email = email;
    this.password = password;
  }
}

class UserApi {
  constructor() { }

  static get url() {
    return `${Api.baseUrl}/user`;
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    Se le puede pasar en el JSON solo las props que se quieran actualizar.
    Ejemplo si modificando todas las propiedades posibles :
    {
        "a_name": (string),
        "a_gender": "M"/"F",
        "a_image_url": (string),
        "a_password": (string),
      }
  RESULTADOS:
    200 - la cantidad de usuarios que se modificaron (debría ser siempre 1)
    404 - No se encontró el usuario con el ID especificado
  */
  static modifyMe(user) {
    return Api.put(`${UserApi.url}`, user);
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    --
  RESULTADOS:
    200 - la cantidad de usuarios que se borraron (debría ser siempre 1)
    404 - No se encontró el usuario con el ID especificado
  */
  static deleteMe() {
    return Api.delete(`${UserApi.url}`);
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    --
  RESULTADOS:
    200 - Datos del usuario
      EJEMPLO:
      {
        "message": "Successfully fetched user",
        "result": {
          "a_user_id": 1,
          "a_name": "roberto",
          "a_gender": "M",
          "a_birthdate": null,
          "a_created_at": "2020-06-29T14:51:45.032Z",
          "a_image_url": (url)
        }
      }
    404 - No se encontró el usuario con el ID especificado
  */
  static get() {
    return Api.get(`${UserApi.url}`);
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    --
  RESULTADOS:
    200 - datos del usuario:
      {
        "a_user_id": (integer),
        "a_name": (string),
        "a_gender": (string),
        "a_birthdate": (string),
        "a_created_at": (string),
        "a_image_url": (string)
      }
    404 - No se encontró el usuario con el ID especificado
  */
  static getMe() {
    return Api.get(`${UserApi.url}`);
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    --
  RESULTADOS:
    200 - datos de los usuarios
      EJEMPLO:
      {
        "message": "Successfully fetched users",
        "result": [
          {
            "a_user_id": 2,
            "a_name": "user2",
            "a_gender": null,
            "a_birthdate": null,
            "a_created_at": "2020-06-29T14:51:45.032Z",
            "a_image_url": (url)
          },
          {
            "a_user_id": 3,
            "a_name": "user3",
            "a_gender": null,
            "a_birthdate": null,
            "a_created_at": "2020-06-29T14:51:45.032Z",
            "a_image_url": (url)
          }
        ]
      }
    404 - No hay usuarios cargados
  */
  static getAll() {
    return Api.get(`${UserApi.url}/all`);
  }
}

export { User, UserApi };