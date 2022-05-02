import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { IgxDialogComponent, IgxListComponent } from '@infragistics/igniteui-angular';
import { Business } from '../models/Business';
import { BookingsService } from '../services/bookings.service';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-user-businesses',
  templateUrl: './user-businesses.component.html',
  styleUrls: ['./user-businesses.component.scss']
})
export class UserBusinessesComponent implements OnInit {

public userBusinesses: Business[] = [];
@ViewChild('businessesList', { static: true })
public businessesList: IgxListComponent;

@ViewChild("alert", {static: true}) public alert: IgxDialogComponent;

private businessToDelete: Business;

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private bookingsService: BookingsService,
    private businessService: BusinessService,
    ) {
   
  }

  ngOnInit(): void {
    this.businessesList.isLoading = true;

    this.businessService.getBusinesses().subscribe(res => {
      this.userBusinesses = res;
      this.businessesList.isLoading = false;
    })
  }

  public requestDelete(event: any){
    this.alert.open()
    this.businessToDelete = event;
  }

  public deleteBusinessFromList(){
    this.businessService.deleteBusiness(this.businessToDelete.businessId).subscribe(res=> {
      this.alert.close();
      window.location.reload();
    }, error => console.error(error));
  }


}
