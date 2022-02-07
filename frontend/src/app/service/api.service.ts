import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PurchaseData } from '../model/purchase';
import { SignupReq } from '../model/sign-up-req';
import { VerifyOtpReq } from '../model/verify-otp-req';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(signUprequest: SignupReq) {
    return this.http
      .post(environment.baseUrl + '/api/login', signUprequest)
      .toPromise();
  }

  getProfile() {
    return this.http.get(environment.baseUrl + '/api/profile').toPromise();
  }
  getPurchaseHistory() {
    return this.http
      .post(environment.baseUrl + '/api/purchaseHistory', {})
      .toPromise();
  }
  register(signUpReq: SignupReq) {
    return this.http
      .post(environment.baseUrl + '/api/register', signUpReq)
      .toPromise();
  }

  verifyOtp(otp: VerifyOtpReq) {
    return this.http
      .post(environment.baseUrl + '/api/verifyOtp', otp)
      .toPromise();
  }
  purchase(purchaseData: PurchaseData) {
    return this.http
      .post(environment.baseUrl + '/api/purchase', purchaseData)
      .toPromise();
  }
  verifyEmail(email: SignupReq) {
    return this.http
      .post(environment.baseUrl + '/api/verifyEmail', email)
      .toPromise();
  }
}
