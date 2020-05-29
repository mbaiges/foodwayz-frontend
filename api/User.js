import { Api } from './api';

class User {
  constructor(data) {
    const {id, name, email, password} = data;
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

class UserApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/user`;
  }

  static add(user) {
  return Api.post(UserApi.url, user);
  }

  static modify(user) {
    return Api.put(`${UserApi.url}/${user.id}`, user);
  }

  static delete(id) {
    return Api.delete(`${UserApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${UserApi.url}/${id}`);
  }

  static getAll() {
    return Api.get(UserApi.url);
  }
}

export { User, UserApi };