export default class UserHasCharacteristic {
  constructor(data) {
    const {userId, charId} = data;
    this.userId = userId;
    this.charId = charId;
  }
}
