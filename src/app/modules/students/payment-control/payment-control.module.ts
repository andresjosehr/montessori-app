import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentControlComponent } from './payment-control.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FileInputModule } from 'app/modules/shared/file-input/file-input.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';





@NgModule({
  declarations: [
    PaymentControlComponent
  ],
  imports: [
    CommonModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		ReactiveFormsModule,
		RouterModule,
		FormsModule,
		MatInputModule,
		MatTooltipModule,
		MatInputModule,
		MatTableModule,
		MatRadioModule,
		NgxMatSelectSearchModule,
		FuseAlertModule,
		MatPaginatorModule,
		FileInputModule,
		MatIconModule,
		MatDatepickerModule,
		MatNativeDateModule
  ]
})
export class PaymentControlModule { }
