import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];

  // for listening to the route we need an instance of activated route
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) {
        this.foods=this.foodService.getSearchResults(params['searchTerm']);
      }
      else if(params['tag']) {
        this.foods=this.foodService.getAllFoodsByTag(params['tag']);
      }
      else {
        this.foods=foodService.getAll();
      }
    })
   }

  ngOnInit(): void {
  }

}
