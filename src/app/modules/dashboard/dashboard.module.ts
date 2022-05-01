import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    CreateProjectComponent,
    CreateDepartmentComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
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
    MatTooltipModule,
    MatExpansionModule,
    MatListModule
  ]
})
export class DashboardModule {
}
