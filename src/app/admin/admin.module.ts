import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { CategoryComponent } from './category/category.component';
import { SpendGroupComponent } from './spend-group/spend-group.component';
import { OperationComponent } from './operation/operation.component';
import { FamilyComponent } from './family/family.component';
import { HelpComponent } from './help/help.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    MainComponent,
    CategoryComponent,
    SpendGroupComponent,
    OperationComponent,
    FamilyComponent,
    HelpComponent]
})
export class AdminModule { }
