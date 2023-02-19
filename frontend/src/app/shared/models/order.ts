import { CartItems } from "./cartItems";

// We create the Checkout Page so for that we need Order model,
// since we need more things than Cart model so Order model helps us in this
export class Order {
  id!: number;
  items!: CartItems[]; // order.items == cart.items
  totalPrice!: number;
  name!: string;
  address!: string;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
