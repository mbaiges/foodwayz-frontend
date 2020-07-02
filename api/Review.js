// Checked / Not Tested

import { Api } from './api';

class Review {
  constructor({ a_review_id, a_user_id, a_food_id, a_desc, a_score }) {
    if (a_review_id)
      this.a_review_id = a_review_id;
    this.a_user_id = a_user_id;
    this.a_food_id = a_food_id;
    if (a_desc)
      this.a_desc = a_desc;
    this.a_score = a_score;
  }
}

class ReviewApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/review`;
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Review especificada
      EJEMPLO:
      {
        "message": "Successfully fetched review",
        "result": {
          "a_review_id": 1,
          "a_desc": "moito ustoso",
          "a_score": "4.50",
          "a_created_at": "2020-06-30T18:30:32.338Z",
          "a_user": {
            "a_user_id": 1,
            "a_name": "user1",
            "a_gender": null,
            "a_birthdate": null,
            "a_email": "user1@email.com",
            "a_created_at": "2020-06-30T18:30:32.338Z",
            "a_image_url": (url)
          },
          "a_food": {
            "a_food_id": 1,
            "a_title": "Paloma al horno",
            "a_description": "Fina comida peruana",
            "a_score": "5.00",
            "a_image_url": (url),
            "a_rest": {
              "a_rest_id": 1,
              "a_name": "McDonalds del obelisco",
              "a_score": "1.20",
              "a_state": "BSAS",
              "a_city": "CABA",
              "a_postal_code": "1234",
              "a_address": "el obelisco 69",
              "a_created_at": "2020-06-30T18:30:32.338Z",
              "a_rest_chain": {
                "a_rest_chain_id": 1,
                "a_name": "McDonalnds",
                "a_score": 4,
                "a_image_url": (url)
              }
            },
            "a_type": {
              "a_type_id": 2,
              "a_type_name": "hamburguesa",
              "a_image_url": (url)
            }
          }
        }
      }
    
    404 - No existe la review
  */
  static get(id) {
    return Api.get(`${ReviewApi.url}/${id}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Review especificada
    404 - No existe la review
  */
  static delete(id) {
    return Api.delete(`${ReviewApi.url}/${id}`);
  }

  /*
  BODY:
    {
      "a_desc":"BuEnArDoOo bREOoO",
      "a_food_id": 1
      "a_score": 1
      "a_user_id": 1
    }
  RESULTADOS:
    200 - Se agregó la review
      EJEMPLO:
      {
        "message": "Successfully added review",
        "result": [
          {
            "a_review_id": 10,
            "a_user_id": 1,
            "a_food_id": 2,
            "a_desc": "BuEnArDoOo bREOoO",
            "a_score": "1.00",
            "a_created_at": "2020-07-01T03:28:47.349Z"
          }
        ]
      }

    400 - Mal pasado algún parámetro
    409 - No existe la comida especificada
      EJEMPLO:
      {
        "message": "Conflict with review",
        "description": [
          {
            "reason": "La llave (a_food_id)=(5) no está presente en la tabla «t_food».",
            "conflicting_obj": null
          }
        ]
      }
  */
  static add(review) {
    return Api.post(`${ReviewApi.url}/food/${review.a_food_id}`, review);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Reviews de la comida especificada
      EJEMPLO:
      {
        "message": "Successfully fetched reviews by food",
        "result": [
          {
            "a_review_id": 2,
            "a_food_id": 2,
            "a_desc": "meh",
            "a_score": "2.50",
            "a_created_at": "2020-06-30T18:30:32.338Z",
            "a_user": {
              "a_user_id": 1,
              "a_name": "user1",
              "a_gender": null,
              "a_birthdate": null,
              "a_email": "user1@email.com",
              "a_created_at": "2020-06-30T18:30:32.338Z",
              "a_image_url": (url)
            }
          },
          {
            "a_review_id": 10,
            "a_food_id": 2,
            "a_desc": "BuEnArDoOo bREOoO",
            "a_score": "1.00",
            "a_created_at": "2020-07-01T03:28:47.349Z",
            "a_user": {
              "a_user_id": 1,
              "a_name": "user1",
              "a_gender": null,
              "a_birthdate": null,
              "a_email": "user1@email.com",
              "a_created_at": "2020-06-30T18:30:32.338Z",
              "a_image_url": (url)
            }
          }
        ]
      }

    404 - No existe la comida especificada
  */
  static getReviewsByFood(foodId) {
    return Api.get(`${ReviewApi.url}/food/${foodId}`);
  }

  /*
  BODY:
    --
  RESULTADOS:
    200 - Reviews del user especificado
      EJEMPLO:
      {
        "message": "Successfully fetched reviews by user",
        "result": [
          {
            "a_review_id": 5,
            "a_user_id": 2,
            "a_desc": "no tan rico",
            "a_score": "3.50",
            "a_created_at": "2020-06-30T18:30:32.338Z",
            "a_food": {
              "a_food_id": 3,
              "a_title": "Kangreburger",
              "a_description": "La mejor debajo del mar. Formula SECRETA!",
              "a_score": "5.00",
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
                "a_created_at": "2020-06-30T18:30:32.338Z"
              },
              "a_type": {
                "a_type_id": 2,
                "a_type_name": "hamburguesa",
                "a_image_url": (url)
              }
            }
          }
        ]
      }

    404 - No existe el user especificado
  */
  static getReviewsByUser(userId) {
    return Api.get(`${ReviewApi.url}/user/${userId}`);
  }
}

export { Review, ReviewApi };