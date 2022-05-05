import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private router: Router,
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
    let postData: any = {};

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

      this.businessService.createBusiness(postData).pipe(shareReplay()).subscribe(res=>{
        console.log(res);
      }, err => {
        console.log(err)
      })
    }
   
    console.log(postData);
  };
}
