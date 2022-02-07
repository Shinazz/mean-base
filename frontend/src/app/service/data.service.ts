import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  openSideNav = new BehaviorSubject<boolean>(false);
  private _email: string = '';
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  private _accessToken: string = '';
  public get accessToken(): string {
    return this._accessToken;
  }
  public set accessToken(value: string) {
    this._accessToken = value;
  }
  constructor() {}
  openNav() {
    this.openSideNav.next(true);
  }
  hideNav() {
    if (this.openSideNav.value) {
      this.openSideNav.next(false);
    }
  }
}
