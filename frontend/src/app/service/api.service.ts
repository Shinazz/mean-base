import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignupReq } from '../model/sign-up-req';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(signUprequest: SignupReq) {
    this.http
      .post(environment.baseUrl + '/api/login', signUprequest)
      .toPromise();
  }
  register(signUpReq: SignupReq) {
    this.http
      .post(environment.baseUrl + '/api/register', signUpReq)
      .toPromise();
  }
}
