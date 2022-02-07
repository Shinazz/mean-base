import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupReq } from '../model/sign-up-req';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private data: DataService
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    const signUpRequest: SignupReq = {
      email: this.signUpForm?.get('email')?.value,
      userName: this.signUpForm?.get('userName')?.value,
    };
    if (signUpRequest.email) {
      const res = await this.api.verifyEmail(signUpRequest);
      if (res) {
        this.data.email = signUpRequest.email;
        this.router.navigate(['/otp']);
      }
    }
  }
}
