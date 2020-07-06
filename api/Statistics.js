// Checked / Not Tested

import { Api } from './api';

class StatisticsApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/statistics`;
  }
  
  static getFoodViewsByDay(foodId) {
    return Api.post(`${StatisticsApi.url}/food/${foodId}/views_by_day`);
  }

  static registerRestaurantViewsByDay(restId) {
    return Api.post(`${StatisticsApi.url}/restaurant/${restId}/views_by_day`);
  }
  
}

export { StatisticsApi };