import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-container', // removed 'app-' from the beginning
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit {

  // two inputs for input-container
  @Input() label!:string;
  @Input() bgColor='white';

  constructor() { }

  ngOnInit(): void {
  }

}
