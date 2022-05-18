import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DateSlotsComponent } from './date-slots-component/date-slots.component';
import { DatesSlotsPanelComponent } from './dates-slots-panel/dates-slots-panel.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { BookingsService } from './bookings.service';



@NgModule({
  declarations: [ DateSlotsComponent, DatesSlotsPanelComponent, UserBookingsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ DateSlotsComponent, DatesSlotsPanelComponent, UserBookingsComponent],
  providers: [ BookingsService ]
})
export class BookingsModule { }
