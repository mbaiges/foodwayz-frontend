export default class Food {
  constructor(data) {
    const {id, desc, score, type, restId} = data;
    if (id) {
      this.id = id;
    }
    this.desc = desc;
    if (score)
      this.score = score;
    else
      this.score = 0;
    this.type = type;
    this.restId = restId
  }
}
