import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessCardComponent } from './business-card/business-card.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessesListComponent } from './businesses-list/businesses-list.component';
import { UserBusinessesComponent } from './user-businesses/user-businesses.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { BusinessService } from './business.service';
import { SharedModule } from '../shared/shared.module';
import { BookingsModule } from '../bookings/bookings.module';



@NgModule({
  declarations: [ BusinessCardComponent, BusinessDetailComponent, BusinessesListComponent, UserBusinessesComponent, CreateBusinessComponent],
  imports: [
    CommonModule,
    SharedModule,
    BookingsModule
  ], 
  exports: [ BusinessCardComponent, BusinessDetailComponent, BusinessesListComponent, UserBusinessesComponent, CreateBusinessComponent],
  providers: [BusinessService]
})
export class BusinessesModule { }
