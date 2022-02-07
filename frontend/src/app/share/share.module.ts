import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularMaterialModule, FlexLayoutModule],
  exports: [CommonModule, AngularMaterialModule, FlexLayoutModule],
})
export class ShareModule {}
