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

  /*
  BODY:
    --
  RESULTADOS:
    200 - se verificó el usuario
      EJEMPLO:
      {
        "result": true
      }
    404 - No existe el usuario
    400 - token expirado
  */
  static verifyEmail(a_email, a_code) {
    return Api.post(`${AuthApi.url}/verify_email`, {a_email: a_email, a_code: a_code});
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - se reenvió el mail
    404 - No existe el usuario
  */
  static resendEmail(a_email) {
    return Api.post(`${AuthApi.url}/resend_email`, {a_email: a_email});
  }

  static resetPassword(a_email) {
    return Api.post(`${AuthApi.url}/reset_password`, {a_email: a_email});
  }

  static resetPasswordConfirmation(a_email, {a_code, a_password_new }) {
    return Api.post(`${AuthApi.url}/reset_password/confirm`, {a_email , a_code, a_password_new});
  }
}

export { AuthApi };