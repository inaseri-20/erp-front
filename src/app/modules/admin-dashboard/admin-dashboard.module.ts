import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { ShareModule } from '../../share/share.module';
import { CoreModule } from '../../core/core.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PersianDatePickerModule } from '../../share/components/persian-date-picker/persian-date-picker.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    CreateProjectComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ShareModule,
    CoreModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PersianDatePickerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class AdminDashboardModule {
}
