import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as moment from 'moment';
import { forkJoin, Observable, of } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { TimeSlot } from '../models/TimeSlot';

@Component({
  selector: 'app-date-slots',
  templateUrl: './date-slots.component.html',
  styleUrls: ['./date-slots.component.scss'],
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
  @Output() timeSlotsLoaded = new EventEmitter<boolean>();

  public loaded = false;
  public timeSlots!: TimeSlot[];

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

    let requestObservables: Observable<any>[] = [];
    this.timeSlots.forEach((t: TimeSlot) => {
      let dateTimeObj = moment(this.date!)
        .set({
          hour: t.slot.hours(),
          minutes: t.slot.minutes(),
          seconds: 0,
          milliseconds: 0,
        })
        .local()
        .toDate();

      const bodyObject = {
        BusinessId: this.currentBusinessId.toString(),
        BookingDateTime: dateTimeObj,
      };
      let obs =this.http
        .post<any[]>(
          this.baseUrl + 'api/bookings/bookingForBusinessAndSlot',
          bodyObject
        );
      requestObservables.push(obs);
    });

    forkJoin(requestObservables).subscribe(
      {
        next: (res) => {
          let cnt = 0;
          res.forEach(r => {
            this.timeSlots[cnt++].isAvailable = r === null;
          })
        },
        complete: () => {
          this.loaded = true;
          this.loaded = true;
          this.timeSlotsLoaded.emit(true);
        }
      }
    );
  }

  public requestBooking(timeslot: TimeSlot) {
    this.authService.getUser().subscribe((x) => {
      console.log(x);
    });

    let dateTimeObj = moment(this.date!)
      .set({
        hour: timeslot.slot.hours(),
        minutes: timeslot.slot.minutes(),
        seconds: 0,
        milliseconds: 0,
      })
      .toDate();
    this.http
      .post<any[]>(this.baseUrl + 'api/bookings', {
        businessId: this.currentBusinessId,
        bookingDateTime: dateTimeObj,
      })
      .subscribe(
        (result) => {
          console.log(result);
          window.location.reload();
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
      const timeStop =  { slot: moment(startTime), isAvailable: true };
      timeStops.push(timeStop);
      startTime.add(interval, 'hours');
      var clone = startTime.clone();
      if (clone.add(interval, 'hour') > endTime) break;
    }
    return timeStops;
  }
}
