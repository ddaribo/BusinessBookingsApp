import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../models/Business';
import { BusinessService } from '../services/business.service';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public businesses: Business[] = [];

  constructor(
    http: HttpClient, 
    @Inject('BASE_URL') baseUrl: string,
    private businessService: BusinessService) {
      this.businessService.getBusinesses().subscribe(result => {
      console.log(result);
      this.businesses = result;
    }, error => console.error(error));

  }
  ngOnInit(): void {
    
  }

}



