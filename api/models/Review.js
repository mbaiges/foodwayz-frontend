export default class Review {
  constructor(data) {
    const {userId, foodId, desc, score} = data;
    this.userId = userId;
    this.foodId = foodId;
    if (desc)
      this.desc = desc;
    this.score = score;
  }
}