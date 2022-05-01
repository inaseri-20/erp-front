import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CoreModule } from '../../core/core.module';
import { ShareModule } from '../../share/share.module';
import { TaskRoutingModule } from './task-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PersianDatePickerModule } from '../../share/components/persian-date-picker/persian-date-picker.module';
import { MatInputModule } from '@angular/material/input';
import { TaskListComponent } from './task-list/task-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CreateTaskComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    CoreModule,
    ShareModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    PersianDatePickerModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class TaskModule {
}
