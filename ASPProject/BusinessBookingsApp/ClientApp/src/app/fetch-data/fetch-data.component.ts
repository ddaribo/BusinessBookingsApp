import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public businesses: Business[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Business[]>(baseUrl + 'business').subscribe(result => {
      console.log(result);
      this.businesses = result;
    }, error => console.error(error));
  }
}

interface Business {
  name: string;
  address: string;
}
