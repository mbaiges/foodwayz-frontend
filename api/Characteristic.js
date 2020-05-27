import { Api } from './api';

class Characteristic {
  constructor(data) {
    const {id, name} = data;
    if (id) {
      this.id = id;
    }
    this.name = name;
  }
}

class CharacteristicApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/characteristic`;
  }

  static add(char) {
  return Api.post(CharacteristicApi.url, char);
  }

  static modify(char) {
    return Api.put(`${CharacteristicApi.url}/${Api.id}`, char);
  }

  static delete(id) {
    return Api.delete(`${CharacteristicApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${CharacteristicApi.url}/${id}`);
  }

  static getAll() {
    return Api.get(CharacteristicApi.url);
  }
}

export { Characteristic, CharacteristicApi };

