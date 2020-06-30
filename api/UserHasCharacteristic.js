import { Api } from './api';

class UserHasCharacteristic {
  constructor(data) {
    const {userId, charId} = data;
    this.userId = userId;
    this.charId = charId;
  }
}

class UserHasCharacteristicApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/user_characteristic`;
  }

  static add(obj) {
    return Api.post(UserHasCharacteristicApi.url, obj);
  }

  static delete(id) {
    return Api.delete(`${UserHasCharacteristicApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${UserHasCharacteristicApi.url}/${id}`);
  }
}

export { UserHasCharacteristic, UserHasCharacteristicApi };