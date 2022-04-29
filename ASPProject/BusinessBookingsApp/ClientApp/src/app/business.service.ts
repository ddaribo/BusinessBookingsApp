import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor( public http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string,
    private authService: AuthorizeService) { }

  public getBookingsByBusiness(id: number) {
    this.http
    .get<any[]>(this.baseUrl + 'api/bookings/byBusiness/' + id
    )
    .subscribe(
      (result) => {
        let bookedSlots: any[] = [];
        result.forEach(r => {
          bookedSlots.push(r.bookingDateTime);
        })
        console.log(bookedSlots);
      },
      (error) => console.error(error)
    );

  }
}
