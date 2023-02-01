import { trigger, state, style, transition, animate } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PaginatorEvent } from 'app/interfaces/general/paginator-event';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { PaymentControlService } from 'app/modules/payment-control/service/payment-control.service';
import { GlobalService } from 'app/services/global/global.service';
import { Subject, takeUntil } from 'rxjs';
import { StudentsService, SearchObject } from '../service/students.service';
import { PaymentControlEnrollmentComponent } from './payment-controlenrollment-payment-control.component';

@Component({
  selector: 'app-payment-control',
  templateUrl: './payment-control.component.html',
  styleUrls: ['./payment-control.component.scss'],
	animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaymentControlComponent extends PaymentControlEnrollmentComponent implements OnInit {

  columns: Array<string> = ['mes', 'estado', 'pagador', 'fecha_pago'];
	dataSource: MatTableDataSource<any>;
	studentsPaginated: any;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();

	years;
	yearFC: FormControl = new FormControl();

	dolarBCV: any;
	currentMonthPrice: number;
	amountValidation: number;

	currentDate = new Date();

	paymentFG: FormGroup;
	studentID: number;

	seachFormGroup: FormGroup;
	documentTypeFC: FormControl = new FormControl();
	paymentData: any;
	months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] as string[];

	abonatedVESFC = new FormControl();
	abonatedUSDFC = new FormControl();


  constructor(
		public _studentsService: StudentsService,
		public _activatedRoute: ActivatedRoute,
		private _router: Router,
		public _formBuilder: FormBuilder,
		public _globalService: GlobalService,
		public _paymentControlService: PaymentControlService,
		private _fuseConfirmationService: FuseConfirmationService,
	) {
		super(_formBuilder , _studentsService, _globalService, _activatedRoute, _paymentControlService);
	}


  ngOnInit(): void {
		this.paymentData = [];
		for(let i = 0; i < 12; i++){
			this.paymentData.push({
				month: i,
				debt: 0,
				payments: []
			})
		}
		this._paymentControlService.getDolarBCV().subscribe((response: any) => {
			this.dolarBCV = response.data;
		});
		this._paymentControlService.getMonthPrice().subscribe((response: any) => {
			this.currentMonthPrice = response.data;
			this.amountValidation = response.data;
			this.paymentData = this.paymentData.map((payment) => ({...payment, debt: this.amountValidation}))
		});
		this._paymentControlService.getYears().subscribe((response: any) => {
			const years = response.data.map(month => month.year);
			this.years = years.filter((year, index) => years.indexOf(year) === index);
			this.yearFC.setValue((new Date()).getFullYear(), {emitEvent: false});
		});

		this.paymentFG = this._formBuilder.group({
			full_name: [],
			document: [],
			month: [],
			year: [],
			ves_amount: [],
			usd_amount: [],
			payment_date: [],
			payment_method: [],
			reference_number: [],
			payer_type: []
		});

		this.paymentFG.get('ves_amount').valueChanges.subscribe((value) => {
			let abonatedUSDFC = parseFloat((value / this.dolarBCV).toFixed(2));
			if(abonatedUSDFC > this.amountValidation){
				abonatedUSDFC = this.amountValidation;
				this.paymentFG.get('ves_amount').setValue(this.amountValidation * this.dolarBCV, {emitEvent: false});
			}
			this.paymentFG.get('usd_amount').setValue(abonatedUSDFC, {emitEvent: false});
		});
		this.paymentFG.get('usd_amount').valueChanges.subscribe((value) => {
			let abonatedVESFC = parseFloat((value * this.dolarBCV).toFixed(2));
			if(abonatedVESFC > this.amountValidation * this.dolarBCV){
				abonatedVESFC = this.amountValidation * this.dolarBCV;
				this.paymentFG.get('usd_amount').setValue(this.amountValidation, {emitEvent: false});
			}
			this.paymentFG.get('ves_amount').setValue(abonatedVESFC, {emitEvent: false});
		});


		this.paymentFG.get('year').valueChanges.subscribe((value) => {
			this.amountValidation = this.currentMonthPrice;
			if(value === this.yearFC.value && this.paymentFG.get('month').value){
				this.amountValidation = this.paymentData.find((payment) => payment.month === this.paymentFG.get('month').value).debt;
			}
		});

		this.paymentFG.get('month').valueChanges.subscribe((value) => {
			this.amountValidation = this.currentMonthPrice;
			if(this.paymentFG.get('year').value === this.yearFC.value && value){
				this.amountValidation = this.paymentData.find((payment) => payment.month === value).debt;
			}
		});

		this.paymentFG.get('payer_type').valueChanges.subscribe((value) => {
			if(value === 'Natural'){
				this.documentTypeFC.setValue('V');
			} else {
				this.documentTypeFC.setValue('J');
			}
		});

		this.paymentFG.get('payer_type').setValue('Natural');

		this.seachFormGroup = this._formBuilder.group({
			file: [null], city: [null], company: [null], profession: [null],
			fileSelect: ['Seleccionar'], citySelect: ['Seleccionar'], companySelect: ['Seleccionar'], professionSelect: ['Seleccionar'],
		});

		this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
			if (params.m) {
				this.m = params.m;
			}
			if(params.id){
				this.studentID = params.id;
				this.getPaymentData((new Date()).getFullYear());
			}
		});

		this.yearFC.valueChanges.subscribe((value) => {
			this.getPaymentData(value);
		});
  }

	getPaymentData(year): void {
		this._studentsService.getPayments(this.studentID, year).subscribe((response: any) => {
			this.paymentData = this.paymentData.map((payment, index) => {
				console.log(response.data.filter((payment) => payment.month === index + 1))
				return {
					...payment,
					debt: response.data.filter((payment) => payment.month === index + 1).reduce((acc, payment) => {
						// console.log(acc, payment.usd_amount)
						return acc - payment.usd_amount
					}, payment.debt),
					payments: response.data.filter((payment) => payment.month === index + 1)
				}
			});
			console.log(this.paymentData);
		});
	}


	filter(value: string, array: any): any {
		const filterValue = value.toLowerCase();
		return array.filter(option => (option || '').toLowerCase().includes(filterValue));
	}

	regiterPayment(): void {
		this._studentsService.registerPayment(this.studentID, this.paymentFG.value).subscribe((response: any) => {
			this._globalService.openSnackBar('Pago registrado', 2000, 'success');
			if(this.yearFC.value == (new Date()).getFullYear()){
				this.paymentData = this.paymentData.map((payment, index) => {
					if(payment.month === this.paymentFG.get('month').value){
						return {
							...payment,
							debt: payment.debt - this.paymentFG.get('usd_amount').value,
							payments: [...payment.payments, response.data]
						}
					}
					return payment;
				});
				this.paymentFG.reset();
				this.paymentFG.get('payer_type').setValue('Natural');
			}
		});
	}

	goToStudent(id: string): void{
		this._router.navigate(['alumnos', 'editar', id]);
	}

	goToPaymentControl(id: string): void{
		this._router.navigate(['alumnos', 'control-de-pago', id]);
	}


	resendSignUpEmail(id: number): void{
		this._studentsService.resendSignUpEmail(id).subscribe((response) => {
			this._globalService.openSnackBar('Correo enviado', 5000, 'success');
			console.log(response);
		});
	}

	openDialog(id): void {
		const dialogRef = this._fuseConfirmationService.open({
			title: 'Atención',
			message: '¿Está seguro que desea eliminar este pago?. Esta acción no se puede deshacer.',
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
			if(result === 'confirmed'){
				this._paymentControlService.delete(id).subscribe((response) => {
					this._globalService.openSnackBar('Alumno eliminado', 5000, 'success');
					this.getPaymentData(this.yearFC.value);
				});
			}
		});
	}

	getPaymentSum(payment): number{
		return payment.payments.reduce((acc, payment) => {
			return acc + payment.usd_amount
		}, 0);
	}

}
