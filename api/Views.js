// Checked / Not Tested

import { Api } from './api';

class ViewsApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/views`;
  }
  
  static registerFoodView(foodId) {
    return Api.post(`${ViewsApi.url}/food/${foodId}`);
  }

  static registerRestaurantView(restId) {
    return Api.post(`${ViewsApi.url}/restaurant/${restId}`);
  }
  
}

export { ViewsApi };