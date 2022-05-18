import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BusinessDetailComponent } from "./businesses/business-detail/business-detail.component";
import { BusinessesListComponent } from "./businesses/businesses-list/businesses-list.component";
import { CreateBusinessComponent } from "./businesses/create-business/create-business.component";
import { HomeComponent } from "./shared/home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuardService } from "./auth/auth-guard.service";
import { UserBookingsComponent } from "./bookings/user-bookings/user-bookings.component";
import { UserBusinessesComponent } from "./businesses/user-businesses/user-businesses.component";
import { SharedModule } from "./shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
      },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'createBusiness', component: CreateBusinessComponent, canActivate: [AuthGuardService]},
    { path: 'businesses', component: BusinessesListComponent },
    { path: 'businesses/:businessId', component: BusinessDetailComponent },
    { path: 'businesses/:businessId/edit', component: CreateBusinessComponent },
    { path: 'my-bookings', component: UserBookingsComponent, canActivate: [AuthGuardService] },
    { path: 'my-businesses', component: UserBusinessesComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}