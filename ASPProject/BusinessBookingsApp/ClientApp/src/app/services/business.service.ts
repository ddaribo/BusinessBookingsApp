import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Business } from '../models/Business';

@Injectable({
  providedIn: 'root',
})
export class BusinessService implements OnDestroy {
  public subject = new BehaviorSubject<Business>(null);

  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string,
    private authService: AuthorizeService
  ) {}

  public getBusinesses(): Observable<Business[]> {
    return this.http.get<Business[]>(this.baseUrl + 'api/businesses');
  }

  public createBusiness(bodyObject: any): Observable<Business> {
    return this.http
      .post<Business>(this.baseUrl + 'api/businesses', bodyObject)
      .pipe(
        tap((business) => {
          this.subject.next(business);
        })
      );
  }


  public editBusiness(businessId: number, bodyObject: any){
    return this.http
      .post(this.baseUrl + 'api/businesses/update/' + businessId, bodyObject)
      .pipe(
        tap((business: any) => {
          this.subject.next(business);
        })
      );
  }

  public getBusinessById(
    businessId: number
  ): Observable<Business> {
    return this.http.get<Business>(
      this.baseUrl + 'api/businesses/' + 
      businessId
    );
  }

  public deleteBusiness(id: number) {
    this.subject.next(null);

    return this.http.delete<Business>(this.baseUrl + 'api/businesses/' + id);
  }

  ngOnDestroy(): void {
    this.subject.complete();
  }
}
