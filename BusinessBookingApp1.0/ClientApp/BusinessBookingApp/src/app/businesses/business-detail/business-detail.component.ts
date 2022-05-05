import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxDialogComponent } from '@infragistics/igniteui-angular';
import { Observable, pipe } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css'],
})
export class BusinessDetailComponent implements OnInit {
  @ViewChild("confirm", {static: true}) public confirmDialog: IgxDialogComponent;
  public businessId!: number;
  public isCurrentUserTheOwner = false;
  public business: any;

  public isAuthenticated?: boolean;
  public user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    http: HttpClient,
    private businessService: BusinessService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.businessId = +params.get('businessId');
      console.log(this.businessId);
    });

    this.businessService.getBusinessById(this.businessId)
    .subscribe((response: any) => {
      this.business = response;

       this.isAuthenticated =  this.authService.isAuthenticated();
       if(this.isAuthenticated) {
        //this.isCurrentUserTheOwner = this.authService.getToken === this.business.createdByUserId;
       }
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
