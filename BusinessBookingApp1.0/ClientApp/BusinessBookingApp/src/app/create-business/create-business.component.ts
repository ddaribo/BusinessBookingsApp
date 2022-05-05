import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { shareReplay } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.css']
})
export class CreateBusinessComponent implements OnInit {
  public isEditing = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private businessService: BusinessService
    ) { }

  public business: any;

  public businessForm = this.fb.group({
    name: ["", Validators.required],
    address: ["", Validators.required],
    imageUrl: [""],
    workHoursStart: ["",Validators.required],
    workHoursEnd: ["", Validators.required],
    timeSlotLength: ["",Validators.required],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    let postData: any = {};

    for (const key in this.businessForm.value) {
      postData[key] = this.businessForm.value[key];
    }
    
    /*if(this.isEditing){
      postData["businessId"] = this.business.businessId;

      this.businessService.editBusiness(this.business.businessId, postData).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err)
      })
    } else {*/

      this.businessService.createBusiness(postData).pipe(shareReplay()).subscribe(res=>{
        console.log(res);
      }, err => {
        console.log(err)
      })
   
    console.log(postData);
  };
}
