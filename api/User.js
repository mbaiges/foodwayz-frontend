// Checked / Not Tested

import { Api } from './api';

class User {
  constructor({ a_user_id, a_name, a_email, a_password, a_gender, a_birthdate, a_image_url }) {
    if (a_user_id) {
      this.a_user_id = a_user_id;
    }
    this.a_name = a_name;
    this.a_email = a_email;
    this.a_password = a_password;
    this.a_gender = a_gender;
    this.a_birthdate = a_birthdate;
    this.a_image_url = a_image_url;
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
    400 - No se encontró el usuario con el ID especificado
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

  static get(id) {
    return Api.get(`${UserApi.url}/${id}`);
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
    400 - No se encontró el usuario con el ID especificado
  */
  static getMe() {
    return Api.get(`${UserApi.url}`);
  }

  static getAll() {
    return Api.get(`${UserApi.url}/all`);
  }
}

export { User, UserApi };