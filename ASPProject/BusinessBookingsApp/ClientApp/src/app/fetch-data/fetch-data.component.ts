import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { interval } from 'rxjs';

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

interface Business {
  businessId: number,
  name: string;
  address: string;
  workHoursStart: string;
  workHoursEnd: string;
  timeSlotLength: string;
}

