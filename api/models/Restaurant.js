export default class Restaurant {
  constructor(data) {
    const {id, name, score, state, city, postalCode, address, restChainId} = data;
    if (id) {
      this.id = id;
    }
    this.name = name;
    if (score)
      this.score = score;
    else
      this.score = 0;
    this.state = state;
    this.city = city;
    this.postalCode = postalCode;
    this.address = address;
    if (restChainId)
      this.restChainId = restChainId;
  }
}