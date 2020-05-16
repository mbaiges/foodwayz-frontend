export default class Characteristic {
  constructor(data) {
    const {id, name} = data;
    if (id) {
      this.id = id;
    }
    this.name = name;
  }
}
