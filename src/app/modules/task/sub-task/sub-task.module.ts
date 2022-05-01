import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubTaskListComponent } from './sub-task-list/sub-task-list.component';
import { SubTaskCreateComponent } from './sub-task-create/sub-task-create.component';
import { SubTaskRoutingModule } from './sub-task-routing.module';
import { ShareModule } from '../../../share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    SubTaskListComponent,
    SubTaskCreateComponent
  ],
  imports: [
    CommonModule,
    SubTaskRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SubTaskModule {
}
