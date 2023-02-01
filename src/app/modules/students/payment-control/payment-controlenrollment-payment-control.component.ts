import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentControlService } from 'app/modules/payment-control/service/payment-control.service';
import { GlobalService } from 'app/services/global/global.service';
import { StudentsService } from '../service/students.service';

@Component({
  selector: 'app-payment-control-enrollment',
  template: '',
})
export class PaymentControlEnrollmentComponent implements OnInit {

	enrollmentFG: FormGroup;
	documentTypeEnrollmentFG: FormControl = new FormControl();
	estudianteID: number;
	enrollmentFee: any;
	dolarBCV: any;
	paymentEnrollmentData: any;


  constructor(
		public _formBuilder: FormBuilder,
		public _studentsService: StudentsService,
		public _globalService: GlobalService,
		public _activatedRoute: ActivatedRoute,
		public _paymentControlService: PaymentControlService,
	) {
		this.enrollmentFG = this._formBuilder.group({
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

		this._paymentControlService.getEnrollmentFees().subscribe((response: any) => {
			this.enrollmentFee = response.data[0].amount_usd;
			this.getBCV();
		});

		this._activatedRoute.params.subscribe((params) => {
			if(params.id){
				this.estudianteID = params.id;
				this.getEnrollmentPaymentData();
				// this.getPaymentData((new Date()).getFullYear());
			}
		});

		this.enrollmentFG.get('payer_type').valueChanges.subscribe((value) => {
			if(value === 'Natural'){
				this.documentTypeEnrollmentFG.setValue('V');
			} else {
				this.documentTypeEnrollmentFG.setValue('J');
			}
		});
	}

	getBCV(){
		this._paymentControlService.getDolarBCV().subscribe((response: any) => {
			this.dolarBCV = response.data;
			this.enrollmentFG.get('usd_amount').setValue(this.enrollmentFee, {emitEvent: false});
			this.enrollmentFG.get('ves_amount').setValue(this.enrollmentFee * this.dolarBCV, {emitEvent: false});
		});
	}

	getEnrollmentPaymentData(){
		this._studentsService.getEnrollmentPayments(this.estudianteID).subscribe((response: any) => {
			this.paymentEnrollmentData = response.data;
			this.enrollmentFG.patchValue(this.paymentEnrollmentData);
			console.log(this.paymentEnrollmentData);
		});
	}

  ngOnInit(): void {
  }

	regiterPaymentEnrollment(){
		this._studentsService.registerEnrollmentPayment(this.estudianteID, this.enrollmentFG.value).subscribe((response: any) => {
			this._globalService.openSnackBar('Pago de inscripción guardado exitosamente', 2000, 'success');
		});

	}

}
