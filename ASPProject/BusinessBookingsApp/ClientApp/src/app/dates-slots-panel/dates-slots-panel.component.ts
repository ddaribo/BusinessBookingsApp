import { Component, Input, OnInit } from '@angular/core';
import { Business } from '../models/Business';

@Component({
  selector: 'app-dates-slots-panel',
  templateUrl: './dates-slots-panel.component.html',
  styleUrls: ['./dates-slots-panel.component.scss']
})
export class DatesSlotsPanelComponent implements OnInit {
  @Input()
  public currentBusiness!: Business;
  public intervalTime!: number;
  public currentThreeDates!: Date[];
  public timeSlotsLoaded = false;

  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    this.currentThreeDates! = [today, this.addDays(today,1), this.addDays(today,2)];
  }

  private addDays(date: Date, days: number){
    const newDate = new Date(date);
    return new Date(newDate.setDate(newDate.getDate() + days));
  }

  public handleTimeSlotsLoaded(event: boolean) {
    this.timeSlotsLoaded = event;
  }

  public loadPrevThreeDates() {
    const firstDate = this.currentThreeDates![0];

    this.currentThreeDates = [
      this.addDays(firstDate, -1),
      this.addDays(firstDate, -2),
      this.addDays(firstDate, -3),
    ];
  }

  public loadNextThreeDates() {
    const lastDate = this.currentThreeDates![2];
    this.currentThreeDates = [
      this.addDays(lastDate, 1),
      this.addDays(lastDate, 2),
      this.addDays(lastDate, 3),
    ];
  }
}
