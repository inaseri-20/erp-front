import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistantDashboardComponent } from './assistant-dashboard/assistant-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: AssistantDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistantDashboardRoutingModule {
}
