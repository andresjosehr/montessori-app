import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentControlListComponent } from './payment-control-list.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatButtonModule } from '@angular/material/button';
import { FuseConfirmationModule } from '@fuse/services/confirmation';



@NgModule({
  declarations: [
    PaymentControlListComponent
  ],
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTabsModule,
		MatFormFieldModule,
		MatInputModule,
		FuseAlertModule,
		MatButtonModule,
		FuseConfirmationModule
  ]
})
export class PaymentControlListModule { }
