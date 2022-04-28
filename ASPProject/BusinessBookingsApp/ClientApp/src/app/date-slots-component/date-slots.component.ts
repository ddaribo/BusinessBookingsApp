import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-slots',
  templateUrl: './date-slots.component.html',
  styleUrls: ['./date-slots.component.css']
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
  public timeSlots!: any[];


  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    
  }

  ngOnInit(): void {
    this.timeSlots! = this.getTimeStops(this.startHour!, this.endHour!, this.intervalTime!);
  }

  public requestBooking(timeslot: any){
    let dateTimeObj = moment(this.date!).set({ hour: timeslot.hours(), minutes: timeslot.minutes(), seconds: 0}).toDate();
console.log(dateTimeObj);
    this.http.post<any[]>(this.baseUrl + 'api/bookings', {
      "businessId": 2,
	    "bookingDateTime":dateTimeObj,
    }).subscribe(result => {
      console.log(result);
      

    }, error => console.error(error));
  }

  private getTimeStops(start: moment.MomentInput, end: moment.MomentInput, interval: any){
    var startTime = moment(start, 'HH:mm');
    var endTime = moment(end, 'HH:mm');
    
    if(endTime.isBefore(startTime) ){
      endTime.add(1, 'day');
    }
  
    var timeStops = [];
  
    while(startTime <= endTime){
      timeStops.push(moment(startTime));
      startTime.add(interval, 'hours');
      var clone = startTime.clone();
      if(clone.add(interval, 'hour') > endTime) break;
    }
    return timeStops;
  }
}
