import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartQuantity: number = 0; // to keep track of the current cart quantity
  user!:User; // required
  constructor(cartService: CartService, private userService: UserService) { // injecting User Service to show the name of the User
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity=newCart.total;
    })

    // subscribe to the UserService just like we subscribed to the cart
    userService.userObservable.subscribe((newUser) => {
      this.user=newUser;
    })
    // anytime we set the user inside the UserService it will be set in User in Header Component -> header.html mei chalte hai
  }

  ngOnInit(): void {
  }

  logout() {
    // userService needs to be private to have access to it
    this.userService.logout();
  }

  // replacing user.taken with isAuth
  get isAuth() {
    return this.user.token;
  }

}
