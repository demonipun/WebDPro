import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  // activatedRoute --> to get the 'id' parameter from the URL
  // foodService --> to get the food with the required id in new component page
  // private for CartService as we want the cart service to accessible throughout the cart service and not just inside the constructor
  constructor(activatedRoute: ActivatedRoute, foodService: FoodService, private cartService: CartService, private router: Router) {
     activatedRoute.params.subscribe((params) =>{
      // if params['id'] is defined
      if(params['id']) {
        // this.food=foodService.getFoodById(params['id']);
        foodService.getFoodById(params['id']).subscribe(serverFood => {
          this.food = serverFood;
        })
      }
     })
   }

  ngOnInit(): void {
  }

  addToCart() {
    // we need to inject the cart service we defined
    this.cartService.addToCart(this.food);
    // we need to redirect the user to the Cart page whenever he presses the button -> inject Router (in constructor)
    this.router.navigateByUrl('/cart-page');
  }

}
