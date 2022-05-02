import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Booking, BookingQuery } from '../models/Bookings';

@Injectable({
  providedIn: 'root',
})
export class BookingsService implements OnDestroy {
  public subject = new BehaviorSubject<Booking>(null);

  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string,
    private authService: AuthorizeService
  ) {}

  public getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl + 'api/bookings');
  }

  public getBookingsByBusiness(id: number): Observable<Booking[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/bookings/byBusiness/' + id);
  }

  public getBookingsByBusinessAndSlot(
    bodyObject: BookingQuery
  ): Observable<Booking[]> {
    return this.http.post<any[]>(
      this.baseUrl + 'api/bookings/bookingForBusinessAndSlot',
      bodyObject
    );
  }

  public getUserBookings(): Observable<Booking[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/bookings/userBookings');
  }

  public createBooking(bodyObject:any
  ): Observable<Booking> {
    return this.http
      .post<Booking>(this.baseUrl + 'api/bookings', bodyObject)
      .pipe(
        tap((booking) => {
          this.subject.next(booking);
        })
      );
  }

  public deleteBooking(id: number) {
    this.subject.next(null);

    return this.http.delete<Booking>(this.baseUrl + 'api/bookings/' + id);
  }

  ngOnDestroy(): void {
    this.subject.complete();
  }
}
