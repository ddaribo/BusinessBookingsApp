import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { IgxDialogComponent, IgxListComponent } from '@infragistics/igniteui-angular';
import { forkJoin, Observable } from 'rxjs';
import { BookingsService } from '../bookings.service';
import { BusinessService } from '../../businesses/business.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
public userBookingsRev: any[] = [];
private userBookings: any[] = [];
@ViewChild('bookingsList', { static: true })
public bookingsList: IgxListComponent;

@ViewChild("alert", {static: true}) public alert: IgxDialogComponent;

private bookingToDelete: any;

  constructor(
    http: HttpClient,
    private bookingsService: BookingsService,
    private businessService: BusinessService,
    ) {
   
  }

  ngOnInit(): void {
    this.bookingsList.isLoading = true;

    this.bookingsService.getMyBookings().subscribe(res => {
      this.userBookings = res;

      this.userBookings.map(b => {
          b.business = null;
      });
      
      let requestBusinessObsrvables: Observable<any>[] = [];
      this.userBookings.forEach(b => {
        const request =  this.businessService.getBusinessById(b.businessId);
        requestBusinessObsrvables.push(request);
      });
  
      forkJoin(requestBusinessObsrvables).subscribe(
        {
          next: (res) => {
            let cnt = 0;
            console.log(res);
            res.forEach(r => {
              this.userBookings[cnt++].business = r;
            })
          },
          complete: () => {
            this.userBookingsRev = [...this.userBookings.reverse()];
              this.bookingsList.isLoading = false;
          }
        }
      );
    })
  }

  public requestDelete(event: any){
    this.alert.open()
    this.bookingToDelete = event;
  }

  public deleteBookingFromList(){
    this.bookingsService.deleteBooking(this.bookingToDelete.bookingId).subscribe(res=> {
      this.alert.close();
      window.location.reload();
    }, error => console.error(error));
  }

}
