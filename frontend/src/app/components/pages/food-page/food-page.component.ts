import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(activatedRoute: ActivatedRoute, foodService: FoodService) {
     activatedRoute.params.subscribe((params) =>{
      // if params['id'] is defined
      if(params['id']) {
        this.food=foodService.getFoodById(params['id']);
      }
     })
   }

  ngOnInit(): void {
  }

}
