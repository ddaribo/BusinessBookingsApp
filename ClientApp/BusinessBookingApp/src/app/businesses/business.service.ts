import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private createPath = environment.apiUrl + '/businesses/create';
  private getPath = environment.apiUrl + '/businesses/';
  
  constructor(private http: HttpClient,
    private authService: AuthService) {
    
  }

  public getBusinesses(): Observable<any[]> {
    return this.http.get<any[]>(this.getPath);
  }

  public createBusiness(postData: any):Observable<any> {
    return this.http.post<any>(this.createPath, postData);
  }

  public editBusiness(businessId: number, bodyObject: any){
    return this.http
      .put(this.getPath, bodyObject);
  }

  public getBusinessById(
    businessId: number
  ): Observable<any> {
    return this.http.get<any>(
      this.getPath + 
      businessId
    );
  }

  public deleteBusiness(id: number) {
    return this.http.delete<any>(this.getPath + id);
  }
}
