import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxDialogComponent } from '@infragistics/igniteui-angular';
import { User } from 'oidc-client';
import { Observable, pipe } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthorizeService, IUser } from 'src/api-authorization/authorize.service';
import { Business } from 'src/app/models/Business';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css'],
})
export class BusinessDetailComponent implements OnInit {
  @ViewChild("confirm", {static: true}) public confirmDialog: IgxDialogComponent;
  public businessId: number;
  public isCurrentUserTheOwner = false;
  public business: Business;

  public isAuthenticated?: boolean;
  public user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private businessService: BusinessService,
    private authService: AuthorizeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.businessId = +params.get('businessId');
      console.log(this.businessId);
    });

    this.businessService.getBusinessById(this.businessId)
    .subscribe((response: Business) => {
      this.business = response;

      this.authService.isAuthenticated().subscribe((res: boolean) => {
        console.log(res);
       this.isAuthenticated = res;
       if(this.isAuthenticated) {
         this.authService.getUser().pipe(first()).subscribe(u =>{
          //console.log(u.name);
          console.log((u as User))
          console.log(this.business.createdByUserId)
          // @ts-ignore
          this.isCurrentUserTheOwner = u.sub === this.business.createdByUserId;
        })
        }
      });
    });
  }

  public requestDeleteBusiness(){
    this.confirmDialog.open();
  }

  public onConfirmDeleteBusiness(event: any){
    this.confirmDialog.close();

    this.businessService.deleteBusiness(this.businessId).subscribe(res => {
      console.log(res);
      // TODO: redirect
    }, err => console.log(err));
  }
}
