import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { TokenInterceptorService } from './auth/token-interceptor.service';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BookingsModule } from './bookings/bookings.module';
import { BusinessesModule } from './businesses/businesses.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    /* Feature Modules */
    SharedModule,
    AuthModule,
    BookingsModule,
    BusinessesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
