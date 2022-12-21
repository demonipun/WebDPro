import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { sample_foods, sample_tags } from 'src/data';
import { foods_by_id_url, foods_by_search_url, foods_by_tag_url, foods_tags_url, foods_url } from '../shared/constants/urls';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  // connecting all the following methods to backend using HttpClientModule

  // http will not send raw data as type, it will send an Observable nd we need to subscribe to it
  // after connection to backend is finished it will either give us our data or it will give an error

  getAll(): Observable<Food[]> // Food[]
  {
    // return sample_foods;
    return this.http.get<Food[]>(foods_url);
  }

  getSearchResults(searchTerm: string) {
    // return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return this.http.get<Food[]>(foods_by_search_url + searchTerm);
  }

  getAllTags(): Observable<Tag[]> // Tag[]
  {
    // return sample_tags;
    return this.http.get<Tag[]>(foods_tags_url);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> // Food[]
  {
    // return tag==='All' ? this.getAll() : this.getAll().filter(food => food.tags?.includes(tag));
    return tag==='All' ? this.getAll() : this.http.get<Food[]>(foods_by_tag_url + tag);
  }

  getFoodById(foodId: string): Observable<Food> // Food
  {
    // return this.getAll().find(food => food.id==foodId) ?? new Food();
    return this.http.get<Food>(foods_by_id_url + foodId);
  }
}
