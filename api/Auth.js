// Checked / Not Tested

import { Api } from './api';

class AuthApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}`;
  }

  static signUp(user) {
    return Api.post(`${AuthApi.url}/register`, user);
  }

  static signIn(user) {
    console.log(user);
    return Api.post(`${AuthApi.url}/login`, user);
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    --
  RESULTADOS:
    200 - la cantidad de usuarios que se borraron (debría ser siempre 1)
    401 - Invalid Password
  */
  static changePassword(old_password, new_password) {
    return Api.put(`${AuthApi.url}/change_password`, {a_password_old: old_password, a_password_new: new_password});
  }

  /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    --
  RESULTADOS:
    200 - la cantidad de usuarios que se borraron (debría ser siempre 1)
    401 - Invalid Password
  */
  static deleteAccount(password) {
    return Api.put(`${AuthApi.url}/delete_account`, {a_password: password});
  }
}

export { AuthApi };