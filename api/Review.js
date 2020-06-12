import { Api } from './api';

class Review {
  constructor(data) {
    const {userId, foodId, desc, score} = data;
    this.userId = userId;
    this.foodId = foodId;
    if (desc)
      this.desc = desc;
    this.score = score;
  }
}

class ReviewApi{
  constructor() {}

  static get url() {
    return `${Api.baseUrl}/review`;
  }

  static add(review) {
  return Api.post(ReviewApi.url, review);
  }

  static modify(review) {
    return Api.put(`${ReviewApi.url}/${review.id}`, review);
  }

  static delete(id) {
    return Api.delete(`${ReviewApi.url}/${id}`);
  }

  static getReviewsByUser(id) {
    return Api.get(`${ReviewApi.url}/user/${id}`);
  }

  static getReviewsByFood(id) {
    return Api.get(`${ReviewApi.url}/food/${id}`);
  }

  static getAll() {
    return Api.get(ReviewApi.url);
  }
}

export { Review, ReviewApi };