import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})
export class DefaultButtonComponent implements OnInit {

  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text: string = 'Submit';
  @Input() bgColor = '#e72929';
  @Input() color = 'white';
  @Input() fontSizeRem = 1.5;
  @Input() widthRem = 15;
  @Output() onClick = new EventEmitter(); // passing the events we need to use @Output()

  constructor() { }

  ngOnInit(): void {
  }

}
