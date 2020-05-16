export default class Food {
  constructor(data) {
    const {ownerId, restId} = data;
    this.ownerId = ownerId;
    this.restId = restId;
  }
}
