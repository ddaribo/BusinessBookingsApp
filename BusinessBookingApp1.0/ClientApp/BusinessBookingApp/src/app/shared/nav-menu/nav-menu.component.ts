import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public isAuthenticated?: boolean;
  public userName?: Observable<string | null | undefined>;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();
  }

  public logout(){
    this.auth.logout();
  }

}
