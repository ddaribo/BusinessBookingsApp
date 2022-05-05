import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IgxButtonModule, IgxCardModule, IgxDialogModule, IgxIconModule, IgxInputGroupModule, IgxLayoutModule, IgxListModule, IgxProgressBarModule } from '@infragistics/igniteui-angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { BusinessService } from './services/business.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FilterPipe } from './shared/filter.pipe';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BusinessCardComponent } from './businesses/business-card/business-card.component';
import { BusinessDetailComponent } from './businesses/business-detail/business-detail.component';
import { BusinessesListComponent } from './businesses/businesses-list/businesses-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateSlotsComponent } from './date-slots-component/date-slots.component';
import { DatesSlotsPanelComponent } from './dates-slots-panel/dates-slots-panel.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { UserBusinessesComponent } from './user-businesses/user-businesses.component';


import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateBusinessComponent,
    FilterPipe,
    NavMenuComponent,
    BusinessCardComponent,
    BusinessDetailComponent,
    BusinessesListComponent,
    DateSlotsComponent,
    DatesSlotsPanelComponent,
    UserBookingsComponent,
    UserBusinessesComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IgxInputGroupModule,
    IgxButtonModule,
    HttpClientModule,
    BrowserModule,
	  BrowserAnimationsModule,
    ReactiveFormsModule,
    /*Ig Modules */
    IgxButtonModule,
    IgxProgressBarModule,
    IgxCardModule,
    IgxLayoutModule,
    IgxInputGroupModule,
    IgxDialogModule,
    IgxIconModule,
    IgxListModule,
    IgxInputGroupModule,
     /*Material design modules */
     MatToolbarModule,
     MatIconModule,
     MatSidenavModule,
     MatTabsModule,
     MatButtonModule,
     MatBadgeModule,
     MatSelectModule,
     MatButtonModule,
     MatCardModule,
     MatGridListModule,
     MatInputModule,
     MatFormFieldModule,
     MatSelectModule,
  ],
  providers: [
    AuthService,
    BusinessService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
