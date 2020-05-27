import { Api } from './api';

class Owner {
  constructor(data) {
    const {id} = data;
    this.id = id;
  }
}

class OwnerApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/owner`;
  }

  static add(user) {
  return Api.post(OwnerApi.url, user);
  }

  static delete(id) {
    return Api.delete(`${OwnerApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${OwnerApi.url}/${id}`);
  }

  static getAll() {
    return Api.get(OwnerApi.url);
  }
}

export { Owner, OwnerApi };