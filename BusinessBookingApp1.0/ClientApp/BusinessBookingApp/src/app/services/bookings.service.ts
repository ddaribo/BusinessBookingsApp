import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingQuery } from '../models/Bookings';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private createPath = environment.apiUrl + '/bookings/create';
  private getPath = environment.apiUrl + '/bookings/';
  private getMyBookingsPath = environment.apiUrl + '/bookings/my';
  private getByBusinessAndSlotPath = environment.apiUrl + '/bookings/byBusinessAndSlot';
  private getByBusinessPath = environment.apiUrl + '/bookings/byBusiness';

  constructor(
    public http: HttpClient,
    private authService: AuthService) { }

  public getBooking(): Observable<any[]> {
    return this.http.get<any[]>(this.getPath);
  }

  public getMyBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.getMyBookingsPath);
  }

  public getBookingsByBusinessAndSlot(
    bodyObject: any
  ): Observable<any[]> {
    return this.http.post<any[]>(
      this.getByBusinessAndSlotPath,
      bodyObject
    );
  }

  public getBookingsByBusiness(id: number): Observable<any[]> {
    return this.http.post<any[]>(this.getByBusinessPath + id, id);
  }

  public createBooking(postData: any):Observable<any> {
    return this.http.post<any>(this.createPath, postData);
  }

  public editBusiness(businessId: number, bodyObject: any){
    return this.http
      .put(this.getPath, bodyObject);
  }

  public getBusinessById(
    businessId: number
  ): Observable<any> {
    return this.http.get<any>(
      this.getPath + 
      businessId
    );
  }

  public deleteBooking(id: number) {
    return this.http.delete<any>(this.getPath + id);
  }

  public requireEmailReminder(booking: any, date: Date){
    let userName = "";
    // TODO: get email of user
    /*this.authService.getUser().pipe(take(1)).subscribe(
      res => userName = res.name
    );*/
    console.log(date);
    console.log(userName);
      /*return this.http.post<any>('http://localhost:3000/email', {
        "receiver": userName,
        "content": "Sample content",
        "date_issued": booking.bookingDateTime,
      });*/
  }
}
