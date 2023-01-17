import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageStudentComponent} from './manage-student.component';
import {FileInputModule} from 'app/modules/shared/file-input/file-input.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    ManageStudentComponent
  ],
  imports: [
    CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		FormsModule,
		MatCheckboxModule,
		MatButtonModule,
		FileInputModule
  ]
})
export class ManageStudentModule { }
