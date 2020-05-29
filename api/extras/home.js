import { Api } from './api.js';

export { HomeApi, Home };

class HomeApi {
  static get url() {
    return `${Api.baseUrl}/homes`;
  }

  static add(home, controller) {
    return Api.post(HomeApi.url, home, controller);
  }

  static modify(home, controller) {
    return Api.put(`${HomeApi.url}/${home.id}`, home, controller);
  }

  static delete(id, controller) {
    return Api.delete(`${HomeApi.url}/${id}`, controller);
  }

  static get(id, controller) {
    return Api.get(`${HomeApi.url}/${id}`, controller);
  }

  static getAll(controller) {
    return Api.get(HomeApi.url, controller);
  }
}

class Home {
  constructor(id, name, meta) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
  }
}
