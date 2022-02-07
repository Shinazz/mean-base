import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FullComponent } from './full/full.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { PurchasesComponent } from './purchases/purchases.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [FullComponent, PurchasesComponent],
  imports: [CommonModule, PagesRoutingModule, ShareModule],
})
export class PagesModule {}
