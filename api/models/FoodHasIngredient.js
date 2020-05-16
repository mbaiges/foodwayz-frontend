export default class FoodHasIngredient {
  constructor(data) {
    const {foodId, ingrId} = data;
    this.foodId = foodId;
    this.ingrId = ingrId;
  }
}
