import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule
  ],
  declarations: [NavBarComponent],
  exports: [NavBarComponent]
})
export class CoreModule { }
