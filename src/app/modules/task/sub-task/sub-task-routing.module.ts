import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubTaskListComponent } from './sub-task-list/sub-task-list.component';
import { SubTaskCreateComponent } from './sub-task-create/sub-task-create.component';

const routes: Routes = [
  {
    path: ':taskId',
    component: SubTaskListComponent
  },
  {
    path: 'create',
    component: SubTaskCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubTaskRoutingModule {
}
