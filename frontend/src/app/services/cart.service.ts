import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { CartItems } from '../shared/models/cartItems';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // here we need to define a field that holds the cart
  private cart: Cart = this.getCartFromLocalStorage(); // new Cart();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  // functionalities will be Add To Cart && Remove from Cart && updating quantity

  addToCart(food: Food) {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if(cartItem) {
      return;
    }

    // addition of new type of food to the cartItem
    this.cart.items.push(new CartItems(food));

    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string) {
    this.cart.items=this.cart.items.filter(item => item.food.id != foodId);

    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) {
      return;
    }

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;

    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart= new Cart();

    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    // if we send subject to the outside, we could be able to change the value of the subject from outside of the Cart Service but we don't want that to happen
    return this.cartSubject.asObservable(); // we do not need to work ewith Observable when we need the latest value
  }

  getCart(): Cart{ // the Subject always keeps the latest values so here we return the latest value of the cart
    return this.cartSubject.value;
  }

  // To keep the data in Cart persistent so that it is data is not gone on refresh --> Local Storage
  private setCartToLocalStorage() {
    // total price and total count to the cart
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currItem) => prevSum + currItem.price, 0);
    this.cart.total = this.cart.items.reduce((prevSum, currItem) => prevSum + currItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    // notify all listening to cart Observables
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage() {
    const cartJson = localStorage.getItem('Cart');

    // no item inside Local Storage then it will return a new cart
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
