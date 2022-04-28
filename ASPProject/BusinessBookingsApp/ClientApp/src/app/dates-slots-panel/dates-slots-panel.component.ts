import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dates-slots-panel',
  templateUrl: './dates-slots-panel.component.html',
  styleUrls: ['./dates-slots-panel.component.css']
})
export class DatesSlotsPanelComponent implements OnInit {
  public currentThreeDates!: Date[];
  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    this.currentThreeDates! = [today, this.addDays(today,1), this.addDays(today,2)];
  }

  private addDays(date: Date, days: number){
    const newDate = new Date(date);
    return new Date(newDate.setDate(newDate.getDate() + days));
  }
}
