import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
private userBookings: any[] = [];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any[]>(baseUrl + 'api/bookings/userBookings').subscribe(result => {
      console.log(result);
      this.userBookings = result;
      console.log(this.userBookings);

    }, error => console.error(error));

  }

  ngOnInit(): void {
  }

}
