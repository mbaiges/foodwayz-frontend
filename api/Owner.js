// Checked / Not Tested

import { Api } from './api';

class Owner {
  constructor({a_user_id, a_premium_level}) {
    this.a_user_id = a_user_id;
    this.a_premium_level = a_premium_level;
  }
}

class OwnerApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/owner`;
  }

  static makeMeOwner() {
    return Api.post(OwnerApi.url);
  }

  static removeMyOwnership() {
    return Api.delete(OwnerApi.url);
  }

  static updatePremiumStatus({a_premium_level}) {
    return Api.get(OwnerApi.url, {a_premium_level});
  }
}

export { Owner, OwnerApi };