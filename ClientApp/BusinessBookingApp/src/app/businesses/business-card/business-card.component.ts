import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit {

  @Input() business: any;
  //public budinessPhoto: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
