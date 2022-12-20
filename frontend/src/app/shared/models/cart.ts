import { CartItems } from "./cartItems";

export class Cart {
  items: CartItems[] = [];
  // value of CartItems, when we use new Cart() will be [] instead of undefined
  totalPrice: number = 0;
  total:number = 0;
}
