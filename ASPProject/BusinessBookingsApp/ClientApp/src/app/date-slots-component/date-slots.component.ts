import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-date-slots',
  templateUrl: './date-slots.component.html',
  styleUrls: ['./date-slots.component.css'],
})
export class DateSlotsComponent implements OnInit {
  @Input()
  public date!: Date;
  @Input()
  public startHour!: number;
  @Input()
  public endHour!: number;
  @Input()
  public intervalTime!: number;
  @Input()
  public currentBusinessId!: number;
  public timeSlots!: any[];

  // TODO: add isAvailable logic for each timeslot

  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string,
    private authService: AuthorizeService
  ) {}

  ngOnInit(): void {
    this.timeSlots! = this.getTimeStops(
      this.startHour!,
      this.endHour!,
      this.intervalTime!
    );
    console.log('Current business ID: ', this.currentBusinessId);
    this.timeSlots.forEach((t) => {
      const bodyObject = {
        "BusinessId": this.currentBusinessId.toString(),
        "BookingDateTime": t.toDate(),
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      //console.log(t);
      this.http
        .post<any[]>(this.baseUrl + 'api/bookings/bookingForBusinessAndSlot',
        bodyObject,
        {headers: headers}
        )
        .subscribe(
          (result) => {
            //console.log(result);
            t.isAvailable = result === null;
          },
          (error) => console.error(error)
        );
    });
  }

  public requestBooking(timeslot: any) {
    this.authService.getUser().subscribe((x) => {
      console.log(x);
    });

    let dateTimeObj = moment(this.date!)
      .set({ hour: timeslot.hours(), minutes: timeslot.minutes(), seconds: 0 })
      .toDate();
    console.log(dateTimeObj);
    this.http
      .post<any[]>(this.baseUrl + 'api/bookings', {
        businessId: 2,
        bookingDateTime: dateTimeObj,
      })
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error) => console.error(error)
      );
  }

  private getTimeStops(
    start: moment.MomentInput,
    end: moment.MomentInput,
    interval: any
  ) {
    var startTime = moment(start, 'HH:mm');
    var endTime = moment(end, 'HH:mm');

    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day');
    }

    var timeStops = [];

    while (startTime <= endTime) {
      timeStops.push(moment(startTime));
      startTime.add(interval, 'hours');
      var clone = startTime.clone();
      if (clone.add(interval, 'hour') > endTime) break;
    }
    return timeStops;
  }
}
