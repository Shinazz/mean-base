import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { SignupReq } from '../model/sign-up-req';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService
  ) {
    this.otpForm = this.fb.group({
      otp: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    const otpRequest = {
      otp: this.otpForm?.get('otp')?.value,
      email: this.data.email,
    };
    try {
      const res: any = await this.api.verifyOtp(otpRequest);
      this.router.navigate(['/password/' + res.emailToken]);
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }
}
