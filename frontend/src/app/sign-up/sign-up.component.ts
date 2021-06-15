import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { SignupReq } from '../model/sign-up-req';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup | undefined;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  async onSubmit() {
    const signUpRequest: SignupReq = {
      email: this.signUpForm?.get('email')?.value,
      password: this.signUpForm?.get('password')?.value,
    };
    const res = await this.api.register(signUpRequest);
  }
}
