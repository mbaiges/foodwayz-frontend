// Checked / Not Tested

import { Api } from './api';

class searchApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/search`;
  }
  
  /*
  BODY:
    {
        "raw_input": "food_name",
        "filters": {
            "a_type_ids": ,
            "a_ingr_ids": ,
            "a_char_ids":
        },
        "sorted": ,
    }
  RESULTADOS:
    200 - Comidas encontradas

  */
  static searchFood(body) {
    return Api.put(`${searchApi.url}/food`, body);
  }

  /*
  BODY:
    {
        "raw_input": "restaurant_name"
    }
  RESULTADOS:
    200 - Restaurantes encontrados
        EJEMPLO:
        {
            "result": [
                {
                    "a_rest_id": 1,
                    "a_name": "McDonalds del obelisco",
                    "a_score": "1.20",
                    "a_state": "BSAS",
                    "a_city": "CABA",
                    "a_postal_code": "1234",
                    "a_address": "el obelisco 69",
                    "a_premium_level": 0,
                    "a_created_at": "2020-07-03T13:54:40.982Z",
                    "a_rest_chain": {
                        "a_rest_chain_id": 1,
                        "a_name": "McDonalnds",
                        "a_score": "3.50",
                        "a_image_url": (url)
                    }
                },
                {
                    "a_rest_id": 2,
                    "a_name": "McDonalds del libertador",
                    "a_score": "1.20",
                    "a_state": "BSAS",
                    "a_city": "CABA",
                    "a_postal_code": "5678",
                    "a_address": "libertador 420",
                    "a_premium_level": 0,
                    "a_created_at": "2020-07-03T13:54:40.982Z",
                    "a_rest_chain": {
                        "a_rest_chain_id": 1,
                        "a_name": "McDonalnds",
                        "a_score": "3.50",
                        "a_image_url": (url)
                    }
                }
            ]
        }
  */
  static searchRestaurant(body) {
    return Api.put(`${searchApi.url}/restaurant`, body);
  }
}

export { searchApi };