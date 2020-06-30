// Checked / Not Tested

import { Api } from './api';

class UserHasCharacteristic {
  constructor({a_user_id, a_char_id}) {
    this.a_user_id = a_user_id;
    this.a_char_id = a_char_id;
  }
}

class UserHasCharacteristicApi{
  constructor() {}

  static get url() {
    return Api.baseUrl;
  }

  static addCharacteristicToUser(userId, charId) {
    return Api.post(`${UserHasCharacteristicApi.url}/user/${userId}/characteristic/${charId}`);
  }

  static removeCharacteristicFromUser(userId, charId) {
    return Api.delete(`${UserHasCharacteristicApi.url}/user/${userId}/characteristic/${charId}`);
  }

  static getCharactersticsByUser(userId) {
    return Api.get(`${UserHasCharacteristicApi.url}/user/${userId}/characteristic`);
  }

  static getUsersByCharacteristic(userId) {
    return Api.get(`${UserHasCharacteristicApi.url}/characteristic/${userId}/user`);
  }
}

export { UserHasCharacteristic, UserHasCharacteristicApi };