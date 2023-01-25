import { trigger, state, style, transition, animate } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorEvent } from 'app/interfaces/general/paginator-event';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { PaymentControlService } from 'app/modules/payment-control/service/payment-control.service';
import { GlobalService } from 'app/services/global/global.service';
import { Subject, takeUntil } from 'rxjs';
import { StudentsService, SearchObject } from '../service/students.service';

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
export class PaymentControlComponent implements OnInit {

  columns: Array<string> = ['mes', 'estado', 'pagador', 'fecha_pago', 'monto_pagado', 'referencia'];
	dataSource: MatTableDataSource<any>;
	studentsPaginated: any;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();

	years;
	yearFC: FormControl = new FormControl();

	dolarBCV: any;
	currentMonthPrice: number;

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
		private _studentsService: StudentsService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _globalService: GlobalService,
		private _paymentControlService: PaymentControlService
	) { }


  ngOnInit(): void {
		this.paymentData = [];
		for(let i = 0; i < 12; i++){
			this.paymentData.push({
				month: i,
				payments: []
			})
		}
		this._paymentControlService.getDolarBCV().subscribe((response: any) => {
			this.dolarBCV = response.data;
		});
		this._paymentControlService.getMonthPrice().subscribe((response: any) => {
			this.currentMonthPrice = response.data;
		});
		this._paymentControlService.getYears().subscribe((response: any) => {
			const years = response.data.map(month => month.year);
			this.years = years.filter((year, index) => years.indexOf(year) === index);
			this.yearFC.setValue((new Date()).getFullYear());
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
			if(abonatedUSDFC > this.currentMonthPrice){
				abonatedUSDFC = this.currentMonthPrice;
				this.paymentFG.get('ves_amount').setValue(this.currentMonthPrice * this.dolarBCV, {emitEvent: false});
			}
			this.paymentFG.get('usd_amount').setValue(abonatedUSDFC, {emitEvent: false});
		});
		this.paymentFG.get('usd_amount').valueChanges.subscribe((value) => {
			let abonatedVESFC = parseFloat((value * this.dolarBCV).toFixed(2));
			if(abonatedVESFC > this.currentMonthPrice * this.dolarBCV){
				abonatedVESFC = this.currentMonthPrice * this.dolarBCV;
				this.paymentFG.get('usd_amount').setValue(this.currentMonthPrice, {emitEvent: false});
			}
			this.paymentFG.get('ves_amount').setValue(abonatedVESFC, {emitEvent: false});
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
				return {
					...payment,
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
					const monthToPay = this.paymentFG.get('month').value;
					if(index === monthToPay){
						return {...response.data, month: response.data.month-1};
					} else {
						return payment;
					}
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

}
