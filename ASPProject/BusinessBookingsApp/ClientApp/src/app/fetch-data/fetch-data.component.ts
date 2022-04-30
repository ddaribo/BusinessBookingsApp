import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public businesses: Business[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Business[]>(baseUrl + 'api/businesses').subscribe(result => {
      console.log(result);
      this.businesses = result;

    }, error => console.error(error));

  }
  ngOnInit(): void {
    
  }

}

export interface Business {
  businessId: number,
  name: string;
  address: string;
  workHoursStart: number;
  workHoursEnd: number;
  timeSlotLength: number;
}

