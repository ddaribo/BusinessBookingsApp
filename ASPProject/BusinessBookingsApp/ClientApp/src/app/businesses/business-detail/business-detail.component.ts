import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public businessId: number;
  public isCurrentUserTheOwner: boolean;
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

      /*this.authService.subject.subscribe((user: any) => {
        if (user && user.me.id === this.animal.author.id) {
          this.isCurrentUserTheAuthor = true;
        }
      });*/
    });
    this.authService.isAuthenticated().subscribe((res: boolean) => {
      console.log(res);
     this.isAuthenticated = res;
     if(this.isAuthenticated) {
       this.authService.getUser().pipe(first()).subscribe(u =>{
        console.log(u.name);
      })
      }
    });

  }
}
