import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentControlService } from '../service/payment-control.service';

@Component({
  selector: 'app-payment-control-month',
  templateUrl: './payment-control-month.component.html',
  styleUrls: ['./payment-control-month.component.scss'],
	animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaymentControlMonthComponent implements OnInit {

	dolarBCV: number;
	m: '1' | '2' | null = null;
	yearFC: FormControl = new FormControl();
	monthFC: FormControl = new FormControl();
	columns: Array<string> = ['nombre', 'status', 'pagador', 'fecha_pago'];
	months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
	years;
	paymentData: any;
	currentMonthPrice: number;
	yearsSelect;


  constructor(
		private _paymentControlService: PaymentControlService,
		private _activatedRouter: ActivatedRoute,
	) { }

  ngOnInit(): void {

		// Get path params
		this._activatedRouter.params.subscribe(params => {
			this.monthFC.setValue(parseInt(params.month), {emitEvent: false});
			this.yearFC.setValue(params.year + '', {emitEvent: false});
			this.getPayments();
		});
		this._paymentControlService.getMonthPrice().subscribe(response => {
			this.currentMonthPrice = response.data;
		});

		this._paymentControlService.getYears().subscribe(response => {
			const years = response.data.map(month => month.year + '');
			this.years = years.filter((year, index) => years.indexOf(year) === index);
		});

		this.monthFC.valueChanges.subscribe(() => {
			this.getPayments();
		});

		this.yearFC.valueChanges.subscribe(() => {
			this.getPayments();
		});

  }

	getPayments(){
		const year = this.yearFC.value;
		const month = this.monthFC.value;

		this._paymentControlService.getPaymentsByMonth(year, month).subscribe(response => {
			this.paymentData = response.data;
		});
	}

	getPaymentSum(payment): number{
		return payment.reduce((acc, payment) => {
			return acc + payment.usd_amount
		}, 0);
	}



}
