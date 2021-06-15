import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupReq } from '../model/sign-up-req';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // submitter_id: '436-0090',
      // pin_change_key: '',
      email: ['', [Validators.required, Validators.email]],
      password: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  async onSubmit() {
    const signUpRequest: SignupReq = {
      email: this.loginForm?.get('email')?.value,
      password: this.loginForm?.get('password')?.value,
    };
    const res = await this.api.login(signUpRequest);
  }

  signup() {
    this.router.navigate(['signup']);
  }
}
