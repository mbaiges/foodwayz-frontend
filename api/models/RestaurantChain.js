export default class RestaurantChain {
  constructor(data) {
    const {id, name, score} = data;
    
    this.id = id;
    this.name = name;
    if (score)
      this.score = score;
    else
      this.score = 0;
  }
}
