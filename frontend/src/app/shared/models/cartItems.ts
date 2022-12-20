import { Food } from "./food";


// to be used by cart.ts in shared/models
export class CartItems {
  // injecting the services into the component, put an access modifier
  // So we comment lines -> 1 & -> 2
  constructor(public food: Food) {
    // this.food=food; -> 1
  }
  // food!: Food; -> 2
  quantity: number = 1; // default value is 1
  price: number = this.food.price;
}
