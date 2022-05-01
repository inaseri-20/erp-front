import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubTaskListComponent } from './sub-task-list/sub-task-list.component';

const routes: Routes = [
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
