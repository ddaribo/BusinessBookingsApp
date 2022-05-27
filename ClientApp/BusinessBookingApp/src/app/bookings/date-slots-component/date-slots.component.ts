import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IgxDialogComponent } from '@infragistics/igniteui-angular';
import * as moment from 'moment';
import { forkJoin, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { BookingQuery } from '../../shared/models/Bookings';
import { TimeSlot } from '../../shared/models/TimeSlot';
import { AuthService } from '../../auth/auth.service';
import { BookingsService } from '../bookings.service';


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

  @ViewChild("alert", {static: true}) public alert: IgxDialogComponent;

  @ViewChild("confirm", {static: true}) public confirmDialog: IgxDialogComponent;

  public timeslot: TimeSlot;

  public loaded = false;
  public timeSlots!: TimeSlot[];

  constructor(
    public http: HttpClient,
    private bookingsService: BookingsService,
    private authService: AuthService
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

        t.isInPast = dateTimeObj.getTime() < Date.now();

      const bodyObject: BookingQuery = {
        BusinessId: this.currentBusinessId.toString(),
        BookingDateTime: dateTimeObj,
      };
      let obs = this.bookingsService.getBookingsByBusinessAndSlot(bodyObject);
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
          //simulate network latency
          setTimeout(()=>{
            this.loaded = true;
            this.timeSlotsLoaded.emit(true);
          },1500);
        }
      }
    );
  }

  public requestBooking(timeslot: TimeSlot) {
    /*this.authService.getUser().subscribe((x) => {
      console.log(x);
    });*/

    if(!this.authService.isAuthenticated()){
        this.alert.open();
        return;
      } else {

        this.timeslot = timeslot;
        this.confirmDialog.open();
      }
  
  }
  
  
  public onConfirmRequestBooking(event: any){

    let dateTimeObj = moment(this.date!)
    .set({
      hour: this.timeslot.slot.hours(),
      minutes: this.timeslot.slot.minutes(),
      seconds: 0,
      milliseconds: 0,
    })
    .toDate();

  const bodyObject = {
    businessId: this.currentBusinessId,
    bookingDateTime: dateTimeObj,
  };

  console.log(bodyObject);

    this.bookingsService.createBooking(bodyObject).pipe(take(1)).subscribe(
        (result) => {
          console.log(result);
          this.timeslot = null;
          //window.location.reload();
          this.confirmDialog.close();
          /*this.bookingsService.requireEmailReminder(result, bodyObject.bookingDateTime).subscribe(res =>
            console.log(res), err => console.error());*/
        },
        (error) => {
          console.error(error);
          this.confirmDialog.open();
        }
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
      const timeStop =  { slot: moment(startTime), isAvailable: true};
      timeStops.push(timeStop);
      startTime.add(interval, 'hours');
      var clone = startTime.clone();
      if (clone.add(interval, 'hour') > endTime) break;
    }
    return timeStops;
  }
}
