import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PaymentControlListComponent } from './payment-control-list/payment-control-list.component';
import { PaymentControlListModule } from './payment-control-list/payment-control-list.module';

const routes: Route[] = [
	{
		path: '',
		component: PaymentControlListComponent,
	}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
		RouterModule.forChild(routes),
		PaymentControlListModule
  ]
})
export class PaymentControlModule { }
