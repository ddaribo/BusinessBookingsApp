import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Business } from 'src/app/models/Business';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-businesses-list',
  templateUrl: './businesses-list.component.html',
  styleUrls: ['./businesses-list.component.css']
})
export class BusinessesListComponent implements OnInit {

  public businesses: Business[] = [];
  public businesses$: Observable<Business[]>;

  filterInput = '';
  filterCriteria: string;

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
    this.filterCriteria = 'name';

    this.businesses$ = this.businessService.getBusinesses();
  }

}
