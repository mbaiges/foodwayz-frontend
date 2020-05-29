import { Api } from './api';

class Type {
  constructor(data) {
    const {id, name} = data;
    
    this.id = id;
    this.name = name;
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
    return Api.put(`${TypeApi.url}/${type.id}`, type);
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