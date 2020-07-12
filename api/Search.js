// Checked / Not Tested

import { Api } from './api';

class SearchApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/search`;
  }
  
  /*
  BODY:
    {
      "raw_input":"food_name",
      "filters": {
        "a_type_ids": [
            
        ],
        "a_ingr_ids": [
            
        ],
        "a_char_ids": [
            
        ]
      },
      "sorted": {
        "reviews_amount": true
      }
    }

    **EL OBJETO 'sorted' ES OPCIONAL**
    
  RESULTADOS:
    200 - Comidas encontradas
      EJEMPLO:
      {
        "result": [
          {
            "a_food_id": 5,
            "a_title": "Ensalada De Kansas",
            "a_description": "Cuando se acaban los pancitos, RIP.",
            "a_score": "3.00",
            "a_image_url": (url),
            "a_rest": {
              "a_rest_id": 3,
              "a_name": "Kansas de libertador",
              "a_score": "1.20",
              "a_state": "BSAS",
              "a_city": "CABA",
              "a_postal_code": "1313",
              "a_address": "libertador 1221",
              "a_premium_level": 0,
              "a_created_at": "2020-07-03T13:54:40.982Z",
              "a_rest_chain": {
                "a_rest_chain_id": 2,
                "a_name": "Kansas",
                "a_score": "4.50",
                "a_image_url": (url)
              }
            },
            "a_type": {
              "a_type_id": 4,
              "a_type_name": "ensalada",
              "a_image_url": (url)
            },
            "a_ingredients": [
              {
                "a_ingr_id": 2,
                "a_ingr_name": "queso"
              },
              {
                "a_ingr_id": 6,
                "a_ingr_name": "pan"
              },
              {
                "a_ingr_id": 7,
                "a_ingr_name": "lechuga"
              }
            ],
            "a_characteristics": [
              {
                "a_char_id": 1,
                "a_char_name": "vegano"
              },
              {
                "a_char_id": 3,
                "a_char_name": "celiaco"
              },
              {
                "a_char_id": 4,
                "a_char_name": "diabetico"
              }
            ],
            "a_reviews_info": {
              "quantified": [
                0,
                1,
                0,
                0,
                1
              ],
              "qualified": {
                "bad": 1,
                "regular": 0,
                "good": 1
              },
              "total": 2
            }
          },
          {
            "a_food_id": 6,
            "a_title": "Ensalada Blen",
            "a_description": "Aglomerado de hojas verdes acompañado de variedad de pimientos exoticos del himalaya.",
            "a_score": "4.00",
            "a_image_url": (url),
            "a_rest": {
              "a_rest_id": 8,
              "a_name": "Crustacio Cascarudo",
              "a_score": "2.00",
              "a_state": "Fondo De Bikini",
              "a_city": "-",
              "a_postal_code": "1234",
              "a_address": "psherman calle wallaby 42",
              "a_rest_chain_id": null,
              "a_premium_level": 0,
              "a_created_at": "2020-07-03T13:54:40.982Z"
            },
            "a_type": {
              "a_type_id": 4,
              "a_type_name": "ensalada",
              "a_image_url": (url)
            },
            "a_ingredients": [
              {
                "a_ingr_id": 1,
                "a_ingr_name": "tomate"
              },
              {
                "a_ingr_id": 2,
                "a_ingr_name": "queso"
              },
              {
                "a_ingr_id": 3,
                "a_ingr_name": "pollo"
              },
              {
                "a_ingr_id": 7,
                "a_ingr_name": "lechuga"
              },
              {
                "a_ingr_id": 8,
                "a_ingr_name": "zanahorai"
              },
              {
                "a_ingr_id": 9,
                "a_ingr_name": "cebolla"
              }
            ],
            "a_characteristics": [
              {
                "a_char_id": 1,
                "a_char_name": "vegano"
              },
              {
                "a_char_id": 3,
                "a_char_name": "celiaco"
              },
              {
                "a_char_id": 4,
                "a_char_name": "diabetico"
              }
            ],
            "a_reviews_info": {
              "quantified": [
                0,
                0,
                0,
                0,
                0
              ],
              "qualified": {
                "bad": 0,
                "regular": 0,
                "good": 0
              },
              "total": 0
            }
          }
        ]
      }
  */
  static searchFoods(body) {
    return Api.post(`${SearchApi.url}/food`, body);
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
  static searchRestaurants(body) {
    return Api.post(`${SearchApi.url}/restaurant`, body);
  }

  static searchRestaurantChains(body) {
    return Api.post(`${SearchApi.url}/restaurant_chain`, body);
  }

  static searchTypes(body) {
    return Api.post(`${SearchApi.url}/type`, body);
  }

  static searchIngredients(body) {
    return Api.post(`${SearchApi.url}/ingredient`, body);
  }

  static searchCharacteristics(body) {
    return Api.post(`${SearchApi.url}/characteristic`, body);
  }
}

export { SearchApi };