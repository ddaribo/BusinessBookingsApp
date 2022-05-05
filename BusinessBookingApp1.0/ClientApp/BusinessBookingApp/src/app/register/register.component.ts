import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  get username(){
    return this.registerForm.get('username');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }

  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { 
    this.registerForm = this.fb.group({
      'username':['', Validators.required],
      'email':['', Validators.required],
      'password':['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public register(){
    console.log('click');
    console.log(this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe(res =>{
      console.log(res);
    }, err => console.log(err));
  }

}
