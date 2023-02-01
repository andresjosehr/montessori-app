import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { GlobalService } from 'app/services/global/global.service';
import { PaymentControlService } from '../service/payment-control.service';

@Component({
  selector: 'app-payment-control-list',
  templateUrl: './payment-control-list.component.html',
  styleUrls: ['./payment-control-list.component.scss']
})
export class PaymentControlListComponent implements OnInit {

	yearsSelect = [];
	monthsControl;
	currentMonthPrice: number;
	currentYear = new Date().getFullYear();
	months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] as string[];
	priceControl: FormControl = new FormControl(0);
	dolarPrice: number;

	paymentsSummaryByYear = [];

	enrollmentFeeFG: FormGroup;

	enrollmentYears;

  constructor(
		private _paymentControlService: PaymentControlService,
		private _fuseConfirmationService: FuseConfirmationService,
		private _globalService: GlobalService,
		private _formBuilder: FormBuilder,
		private _router: Router
	) { }

  ngOnInit(): void {

		this.enrollmentFeeFG = this._formBuilder.group({
			year: [this.currentYear],
			amount_usd: [0],
		});

		this.enrollmentFeeFG.get('year').valueChanges.subscribe(y => {
			this.enrollmentFeeFG.get('amount_usd').setValue(this.enrollmentYears.find(year => year.year === y).amount_usd, {emitEvent: false});
		})

		this._paymentControlService.getDolarBCV().subscribe(response => {
			this.dolarPrice = response.data;
		});

		this._paymentControlService.getPaymentsByYear(this.currentYear).subscribe(response => {
			this.paymentsSummaryByYear = response.data;
		})

		this._paymentControlService.getYears().subscribe(response => {
			this.monthsControl = response.data
			const years = this.monthsControl.map(month => month.year);
			this.yearsSelect = years.filter((year, index) => years.indexOf(year) === index);
			this.getEnrollmentsByYear();
		})

		this._paymentControlService.getMonthPrice().subscribe(response => {
			this.priceControl.setValue(response.data);
			this.currentMonthPrice = this.priceControl.value;
		})

		// Allow only numbers with 3 decimals. If user write dot, it will be replaced by comma.
		this.priceControl.valueChanges.subscribe(value => {
			// Erase all non numeric characters (except comma and dot)
			// value = value.replace(/[^0-9.,]/g, '');

			// If user write dot, replace it by comma
			// value = value.replace(/\./g, ',');

			// If user write more than one comma, erase all commas except the last one
			// value = value.replace(/,(?=[^,]*,)/g, '');


			this.priceControl.setValue(value, {emitEvent: false});
		});
  }

	getEnrollmentsByYear(): void {

		this._paymentControlService.getEnrollmentFees().subscribe(response => {
			this.enrollmentYears=this.yearsSelect.map(year => {
				return {
					year: year,
					amount_usd: response.data.find(enrollment => enrollment.year === year)?.amount_usd || 0,
				}
			});
			console.log(this.enrollmentYears);
			this.enrollmentFeeFG.get('year').setValue(this.currentYear);
		});
	}


	randNumber(): number{
		return Math.floor(Math.random() * 100);
	}

	savePrice(): void {
		const dialogRef = this._fuseConfirmationService.open({
			title: 'Atención',
			message: '¿Está seguro que desea guardar el precio? Tenga en cuenta que el precio se guardará para todos los meses futuros, sin embargo, el mes actual y los meses anteriores no se verán afectados.',
			icon:{
				show: true,
				name: 'heroicons_outline:exclamation',
				color: 'warning',
			},
			actions: {
				confirm: {
					show: true,
					label: "Confirmar",
					color: "accent"
				},
				cancel: {
					show: true,
					label: "Cancelar"
				}
			},
			dismissible: true
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
			if(result === 'confirmed'){
				this._paymentControlService.updateMonthPrice(this.priceControl.value).subscribe(response => {
					this._globalService.openSnackBar('Precio actualizado correctamente', 4000, 'success');
					this.currentMonthPrice = Number(this.priceControl.value.replace(/,/g, '.'));
				});
			}
		});
	}

	goToPaymentMonth(month: number): void {
		const year = this.currentYear;
		this._router.navigate([`/control-de-pagos/${year}/${month+1}`]);
	}

	saveEnrollmentFee() {
		const values = this.enrollmentFeeFG.value;
		this._paymentControlService.saveEnrollmentFee(values).subscribe(response => {
			this._globalService.openSnackBar('Cuota de inscripción actualizada correctamente', 4000, 'success');
		});
	}

}
