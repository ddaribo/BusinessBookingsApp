import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-businesses-list',
  templateUrl: './businesses-list.component.html',
  styleUrls: ['./businesses-list.component.css']
})
export class BusinessesListComponent implements OnInit {

  public businesses: any[] = [];
  public businesses$: Observable<any[]>;

  filterInput = '';
  filterCriteria: string | undefined;

  constructor(
    http: HttpClient, 
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
