import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentControlMonthComponent } from './payment-control-month.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { FileInputModule } from 'app/modules/shared/file-input/file-input.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



@NgModule({
  declarations: [
    PaymentControlMonthComponent
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
		MatNativeDateModule,
		FuseConfirmationModule
  ]
})
export class PaymentControlMonthModule { }
