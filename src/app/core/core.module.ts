import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material/material.module';
import { AppMainTableComponent } from './app-main-table/app-main-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [NavBarComponent, AppMainTableComponent],
  exports: [NavBarComponent, AppMainTableComponent]
})
export class CoreModule { }
