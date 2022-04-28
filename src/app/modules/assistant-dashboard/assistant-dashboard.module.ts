import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantDashboardComponent } from './assistant-dashboard/assistant-dashboard.component';
import { AssistantDashboardRoutingModule } from './assistant-dashboard-routing.module';
import { CoreModule } from '../../core/core.module';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [
    AssistantDashboardComponent
  ],
  imports: [
    CommonModule,
    AssistantDashboardRoutingModule,
    CoreModule,
    ShareModule
  ]
})
export class AssistantDashboardModule {
}
