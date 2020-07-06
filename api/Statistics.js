// Checked / Not Tested

import { Api } from './api';

class StatisticsApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/statistics`;
  }

    /*
  USA EL ID DEL MIDDLEWARE
  BODY:
    --
  RESULTADOS:
    200 - la cantidad de mejores y peores platos solicitdaos del restaurant ordenados por score correspondiente
      EJEMPLO: 
      {
        "message": "Successfully fetched best and worst foods",
        "result": {
          "a_best": {
              "a_food_quality_score": [food_object_1, ... , food_object_n],
              "a_presentation_score": [food_object_1, ... , food_object_n],
              "a_price_quality_score": [food_object_1, ... , food_object_n] 
          },
          "a_worst": {
              "a_food_quality_score": [food_object_1, ... , food_object_n],
              "a_presentation_score": [food_object_1, ... , food_object_n],
              "a_price_quality_score": [food_object_1, ... , food_object_n] 
          }
        }
      }
      
    400 - la cantidad pasada no es un Integer 
    401 - El user no es owner del restaurant / no tienen el premium level suficiente
  */
 static getBestWorstFoods(restId, cantFoodPerCategory) {
  return Api.post(`${StatisticsApi.url}/restaurant/${restId}/best_worst_food`, {limit: cantFoodPerCategory});
}
  
  static getFoodViewsByDay(foodId, a_first_date, a_last_date) {
    return Api.post(`${StatisticsApi.url}/food/${foodId}/views_by_day`, {a_first_date, a_last_date});
  }

  static getFoodViewsByHour(foodId, a_date) {
    return Api.post(`${StatisticsApi.url}/food/${foodId}/views_by_hour`, {a_date});
  }

  static getFoodUserStatistics(foodId, a_first_date, a_last_date) {
    return Api.post(`${StatisticsApi.url}/food/${foodId}/user`, {a_first_date, a_last_date});
  }

  static getRestaurantViewsByDay(restId, a_first_date, a_last_date) {
    return Api.post(`${StatisticsApi.url}/restaurant/${restId}/views_by_day`, {a_first_date, a_last_date});
  }

  static getRestaurantViewsByHour(restId, a_date) {
    return Api.post(`${StatisticsApi.url}/restaurant/${restId}/views_by_hour`, {a_date});
  }

  static getRestaurantUserStatistics(restId, a_date) {
    return Api.post(`${StatisticsApi.url}/restaurant/${restId}/user`, {a_first_date, a_last_date});
  }
  
}

export { StatisticsApi };