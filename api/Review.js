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

  static get(id) {
    return Api.get(`${ReviewApi.url}/${id}`);
  }

  static delete(id) {
    return Api.delete(`${ReviewApi.url}/${id}`);
  }

  static add(review) {
    return Api.post(`${ReviewApi.url}/food/${review.a_food_id}`, review);
  }

  static getReviewsByFood(foodId) {
    return Api.get(`${ReviewApi.url}/food/${foodId}`);
  }

  static getReviewsByUser(userId) {
    return Api.get(`${ReviewApi.url}/user/${userId}`);
  }
}

export { Review, ReviewApi };