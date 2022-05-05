import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginPath = environment.apiUrl + '/identity/login';
  private registerPath = environment.apiUrl + '/identity/register';

  constructor(private http: HttpClient) {

  }

  public login(data: any): Observable<any> {
    return this.http.post<any>(this.loginPath, data);
  }

  public register(data: any): Observable<any> {
    return this.http.post<any>(this.registerPath, data);
  }

  public saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public isAuthenticated() {
    return this.getToken() ? true : false;
  }
}
