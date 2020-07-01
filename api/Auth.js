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

  static changePassword(last_password, new_password) {
    return Api.put(`${AuthApi.url}/change_password`, {a_password_last: last_password, a_password_new: new_password});
  }

  static deleteAccount(password) {
    return Api.put(`${AuthApi.url}/delete_account`, {a_password: password});
  }
}

export { AuthApi };