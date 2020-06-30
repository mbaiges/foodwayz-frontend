// Checked / Not Tested

import { Api } from './api';

class Type {
  constructor({a_type_id, a_type_name}) {
    if (a_type_id) {
      this.a_type_id = a_type_id;
    }
    this.a_type_name = a_type_name;
  }
}

class TypeApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/type`;
  }

  static add(type) {
  return Api.post(TypeApi.url, type);
  }

  static modify(type) {
    return Api.put(`${TypeApi.url}/${type.a_type_id}`, type);
  }

  static delete(id) {
    return Api.delete(`${TypeApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${TypeApi.url}/${id}`);
  }

  static getAll() {
    return Api.get(TypeApi.url);
  }
}

export { Type, TypeApi };