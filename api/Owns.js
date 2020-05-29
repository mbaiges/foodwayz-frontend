import { Api } from './api';

class Owns {
  constructor(data) {
    const {ownerId, restId} = data;
    this.ownerId = ownerId;
    this.restId = restId;
  }
}

class OwnsApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/owns`;
  }

  static add(obj) {
  return Api.post(OwnsApi.url, obj);
  }

  static delete(id) {
    return Api.delete(`${OwnsApi.url}/${id}`);
  }

  static get(id) {
    return Api.get(`${OwnsApi.url}/${id}`);
  }
}

export { Owns, OwnsApi };