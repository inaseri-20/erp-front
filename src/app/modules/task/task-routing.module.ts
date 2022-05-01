import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateTaskComponent
  },
  {
    path: ':projectId',
    component: TaskListComponent
  },
  {
    path: 'sub-task',
    loadChildren: () => import('./sub-task/sub-task.module').then(m => m.SubTaskModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {
}
