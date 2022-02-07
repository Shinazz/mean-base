import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { FullComponent } from './full/full.component';
import { PurchasesComponent } from './purchases/purchases.component';
const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'page1',
        component: Page1Component,
        data: ['back-button'],
      },
      {
        path: 'purchases',
        component: PurchasesComponent,
        data: ['back-button'],
      },
    ],
  },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
