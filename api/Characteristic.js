// Checked / Not Tested

import { Api } from './api';

class Characteristic {
  constructor({a_char_id, a_char_name}) {
    if (a_char_id) {
      this.a_char_id = a_char_id;
    }
    this.a_char_name = a_char_name;
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
    return Api.put(`${CharacteristicApi.url}/${char.a_char_id}`, char);
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

