import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { CoreModule } from '../../core/core.module';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [
    ClientDashboardComponent
  ],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule,
    CoreModule,
    ShareModule
  ]
})
export class ClientDashboardModule {
}
