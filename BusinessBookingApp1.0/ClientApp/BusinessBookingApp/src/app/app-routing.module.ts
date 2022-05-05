import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BusinessDetailComponent } from "./businesses/business-detail/business-detail.component";
import { BusinessesListComponent } from "./businesses/businesses-list/businesses-list.component";
import { CreateBusinessComponent } from "./create-business/create-business.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { UserBookingsComponent } from "./user-bookings/user-bookings.component";
import { UserBusinessesComponent } from "./user-businesses/user-businesses.component";

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
    { path: 'my-bookings', component: UserBookingsComponent, canActivate: [AuthGuardService] },
    { path: 'my-businesses', component: UserBusinessesComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}