import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {
 @Input() active: boolean;
 @Input('text') text: string;
 @Output() toggleEvent = new EventEmitter<boolean>();

  constructor() { 
    this.active = false
    this.text = ""
  }

  ngOnInit(): void {
  }

  toggle(){
    console.log("toggle");
    this.active =! this.active
    this.toggleEvent.emit(this.active);
  }
}
