import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
    ) { 
    this.loginForm = this.fb.group({
      'username':['', Validators.required],
      'password':['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public login(){
    this.authService.login(this.loginForm.value).subscribe(res =>
    {
      console.log(res);
      this.authService.saveUserData(res['token'], res['userId']);
    }, err => console.log(err));
  }
}
