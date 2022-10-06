import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm='';

  // using any access modifier inside the constructor before the name of parameter, it will be accessible throughout the class
  // if not using any access modifier, it will be accessible only inside the constructor
  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) {
        this.searchTerm=params['searchTerm'];
      }
    });
    // now that we can read data from the route we need to able to send data to the the route too! --> search
   }

   search(term:string) : void {
    if(term) {
      this.router.navigateByUrl('/search/'+term);
    }
   }

  ngOnInit(): void {
  }

}
