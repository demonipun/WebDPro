import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];

  // for listening to the route we need an instance of activated route
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {

    // a food Observable with Food[] as output
    let foodObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) {
        foodObservable=this.foodService.getSearchResults(params['searchTerm']);
      }
      else if(params['tag']) {
        foodObservable=this.foodService.getAllFoodsByTag(params['tag']);
      }
      else {
        foodObservable=foodService.getAll();
      }

      // subscribing to food Observable
      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    })
   }

  ngOnInit(): void {
  }

}
