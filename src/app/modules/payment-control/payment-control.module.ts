import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PaymentControlListComponent } from './payment-control-list/payment-control-list.component';
import { PaymentControlListModule } from './payment-control-list/payment-control-list.module';
import { PaymentControlMonthComponent } from './payment-control-month/payment-control-month.component';
import { PaymentControlMonthModule } from './payment-control-month/payment-control-month.module';

const routes: Route[] = [
	{
		path: '',
		component: PaymentControlListComponent,
	},
	{
		path: ':year/:month',
		component: PaymentControlMonthComponent,
	}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
		RouterModule.forChild(routes),
		PaymentControlListModule,
		PaymentControlMonthModule
  ]
})
export class PaymentControlModule { }
