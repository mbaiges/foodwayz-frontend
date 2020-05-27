import { Api } from './api';

import { User } from './User';

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

}

export { AuthApi };