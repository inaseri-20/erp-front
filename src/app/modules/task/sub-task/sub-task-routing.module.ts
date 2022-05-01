import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubTaskCreateComponent } from './sub-task-create/sub-task-create.component';
import { SubTaskListComponent } from './sub-task-list/sub-task-list.component';

const routes: Routes = [
  {
    path: 'create/:taskId',
    component: SubTaskCreateComponent
  },
  {
    path: ':taskId',
    component: SubTaskListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubTaskRoutingModule {
}
