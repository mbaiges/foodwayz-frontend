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
    return Api.post(`${StatisticsApi.url}/restaurant/${restId}/best_worst_food`, {"limit": cantFoodPerCategory});
  }
  
}

export { StatisticsApi };