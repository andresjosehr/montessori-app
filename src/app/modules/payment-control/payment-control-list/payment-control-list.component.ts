import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
	currentYear = new Date().getFullYear();
	months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] as string[];
	priceControl: FormControl = new FormControl(0);
	dolarPrice: number;

  constructor(
		private _paymentControlService: PaymentControlService,
		private _fuseConfirmationService: FuseConfirmationService,
		private _globalService: GlobalService
	) { }

  ngOnInit(): void {
		this._paymentControlService.getDolarBCV().subscribe(response => {
			this.dolarPrice = response.data;
		});

		this._paymentControlService.getYears().subscribe(response => {
			this.monthsControl = response.data
			const years = this.monthsControl.map(month => month.year);
			this.yearsSelect = years.filter((year, index) => years.indexOf(year) === index);
			console.log(this.yearsSelect);
		})

		this._paymentControlService.getMonthPrice().subscribe(response => {
			console.log(response);
		})

		// Allow only numbers with 3 decimals. If user write dot, it will be replaced by comma.
		this.priceControl.valueChanges.subscribe(value => {
			// Erase all non numeric characters (except comma and dot)
			value = value.replace(/[^0-9.,]/g, '');

			// If user write dot, replace it by comma
			value = value.replace(/\./g, ',');

			// If user write more than one comma, erase all commas except the last one
			value = value.replace(/,(?=[^,]*,)/g, '');


			this.priceControl.setValue(value, {emitEvent: false});
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
				});
			}
		});

	}

}
