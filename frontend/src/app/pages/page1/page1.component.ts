import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {
  userData: any;
  purchaseForm: FormGroup;
  coinsEarned: string = '';
  constructor(private api: ApiService, private fb: FormBuilder) {
    this.purchaseForm = fb.group({
      itemId: [null, [Validators.required]],
      itemName: [null, [Validators.required]],
      itemPrice: [null, [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.userData = await this.api.getProfile();
    const res = await this.api.getPurchaseHistory();
  }

  async getUserDetails() {
    this.userData = await this.api.getProfile();
  }

  async purchase() {
    const purchaseData = this.purchaseForm.value;
    console.log(purchaseData);
    const res: any = await this.api.purchase(this.purchaseForm.value);
    this.coinsEarned = res.coinsEarned;
    this.getUserDetails();
  }
}
