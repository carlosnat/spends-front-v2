import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { FamilyComponent } from './family/family.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OperationComponent } from './operation/operation.component';
import { SpendGroupComponent } from './spend-group/spend-group.component';
import { CategoryComponent } from './category/category.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: 'admin', component: MainComponent, children:
    [
      { path: 'families', component: FamilyComponent },
      { path: 'stats', component: DashboardComponent },
      { path: 'operations', component: OperationComponent },
      { path: 'groups', component: SpendGroupComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'help', component: HelpComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
