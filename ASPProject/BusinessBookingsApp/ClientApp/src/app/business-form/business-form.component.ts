import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Business } from '../models/Business';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css']
})
export class BusinessFormComponent implements OnInit {
  public isEditing = false;
  public business: Business;

  public businessForm = this.fb.group({
    name: ["", Validators.required],
    address: ["", Validators.required],
    imageUrl: [""],
    workHoursStart: ["",Validators.required],
    workHoursEnd: ["", Validators.required],
    timeSlotLength: ["",Validators.required],
  });

  constructor( 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private businessService: BusinessService,
    private authService: AuthorizeService) { }

  ngOnInit(): void {
    this.route.queryParams.
    subscribe((params: Params) => {
      if (params['editing']) {
        this.isEditing = true;

        this.businessForm.controls['workHoursStart'].removeValidators(Validators.required);
        this.businessForm.controls['workHoursEnd'].removeValidators(Validators.required);
        this.businessForm.controls['timeSlotLength'].removeValidators(Validators.required);

        this.route.paramMap.subscribe(params => {
          const businessId: number = +params.get('businessId');

          this.businessService.getBusinessById(businessId).subscribe(b => {
            console.log(b);
            this.business = b;

            this.businessForm.patchValue({
              name: this.business.name,
              address: this.business.address,
              imageUrl: this.business.imageUrl
            });
          });
        });
      }
    });
  }

  
  onSubmit() {
    let postData = {};

    for (const key in this.businessForm.value) {
      postData[key] = this.businessForm.value[key];
    }
    if(this.isEditing){
      postData["businessId"] = this.business.businessId;

      this.businessService.editBusiness(this.business.businessId, postData).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err)
      })
    } else {

      this.businessService.createBusiness(postData).subscribe(res=>{
        console.log(res);
      }, err => {
        console.log(err)
      })
    }
   
    console.log(postData);

    
  };
}
