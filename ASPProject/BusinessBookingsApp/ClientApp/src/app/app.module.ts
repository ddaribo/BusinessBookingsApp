import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { DateSlotsComponent } from './date-slots-component/date-slots.component';
import { DatesSlotsPanelComponent } from './dates-slots-panel/dates-slots-panel.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { IgxButtonModule, IgxCardModule, IgxDialogModule, IgxIconModule, IgxInputGroupModule, IgxLayoutModule, IgxListModule, IgxProgressBarModule } from '@infragistics/igniteui-angular';
import { BusinessCardComponent } from './businesses/business-card/business-card.component';
import { BusinessesListComponent } from './businesses/businesses-list/businesses-list.component';
import { BusinessDetailComponent } from './businesses/business-detail/business-detail.component';
import { FilterPipe } from './shared/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserBusinessesComponent } from './user-businesses/user-businesses.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FilterPipe,
    FetchDataComponent,
    DateSlotsComponent,
    DatesSlotsPanelComponent,
    UserBookingsComponent,
    BusinessCardComponent,
    BusinessDetailComponent,
    BusinessesListComponent,
    UserBusinessesComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserModule,
	  BrowserAnimationsModule,
    FormsModule,
    ApiAuthorizationModule,
    IgxButtonModule,
    IgxProgressBarModule,
    IgxCardModule,
    IgxLayoutModule,
    IgxInputGroupModule,
    IgxDialogModule,
    IgxIconModule,
    IgxListModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'my-bookings', component: UserBookingsComponent, canActivate: [AuthorizeGuard] },
      { path: 'my-businesses', component: UserBusinessesComponent, canActivate: [AuthorizeGuard] },
      { path: 'businesses', component: BusinessesListComponent },
      { path: 'businesses/:businessId', component: BusinessDetailComponent },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
