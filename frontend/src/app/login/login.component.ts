import { Component, Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupReq } from '../model/sign-up-req';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private data: DataService,
    private cookie: CookieService
  ) {
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

  ngOnInit(): void {}

  async onSubmit() {
    const signUpRequest: SignupReq = {
      email: this.loginForm?.get('email')?.value,
      password: this.loginForm?.get('password')?.value,
    };
    const res: any = await this.api.login(signUpRequest);
    console.log(res);

    if (res.token) {
      console.log(res.token);
      this.data.accessToken = res.token;
      this.cookie.set(
        'token',
        res.token,
        3600,
        undefined,
        undefined,
        true,
        'Strict'
      );
      this.router.navigate(['home', 'page1']);
    }
  }

  signup() {
    this.router.navigate(['signup']);
  }
}
