import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { ClientListComponent } from './client-list/client-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'project/create',
    component: CreateProjectComponent
  },
  {
    path: 'department/create',
    component: CreateDepartmentComponent
  },
  {
    path: 'clients',
    component: ClientListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
