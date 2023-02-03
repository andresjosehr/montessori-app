/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { HttpValidationErrorResponse } from 'app/interfaces/http-responses/http-validation-error-response';
import { EntityPropertiesService } from 'app/services/entity-properties/entity-properties.service';
import { GlobalService } from 'app/services/global/global.service';
import { takeUntil } from 'rxjs';
import { StudentsService, SearchObject } from '../service/students.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {

	alert: {type: FuseAlertType; message: string} = {
		type: 'success',
		message: '',
	};
	studentForm: FormGroup;
	showAlert: boolean = false;
	studentID: string = '';
	levels: any;

  constructor(
		public _globalService: GlobalService,
		private _activateRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _studentsService: StudentsService,
		private _entityPropertiesService: EntityPropertiesService,
	) { }

  ngOnInit(): void {
		this.initForm();
		this._activateRoute.params.subscribe((params) => {
			if(params.id){
				this.studentID = params.id;
				this.getStudent();
			}
		});
		this.getLevels();

  }

	initForm(): void{
		this.studentForm = this._formBuilder.group({
			name                : [''],
			last_name           : [''],
			representative_name : [''],
			representative_phone: [''],
			level_id            : [''],
			document            : ['']
		});
	}

	getLevels(): void{
		this._studentsService.getAllLevels().subscribe((response) => {
			this.levels = response.data;
		});
	}

	getStudent(): void{
		this._studentsService.get(this.studentID).subscribe((response) => {
			this.studentForm.patchValue(response.data);
		});
	}

	createStudent(): void{

	// Return if the form is invalid
	if (this.studentForm.invalid) {
		this.studentForm.markAllAsTouched();
		return;
	}

	// Disable the form
	this.studentForm.disable();
	this.studentForm.updateValueAndValidity();

	// Hide the alert
	this.showAlert = false;

	// Sign in
	this._studentsService
		.create(this.studentForm.value)
		// takeUntil(this._unsubscribeAll)
		.pipe()
		.subscribe(
			() => {
				this.studentForm.enable();
				// navigate with query params
				this._router.navigate(['/alumnos/lista', {m: 1}]);
			},
			(response: HttpValidationErrorResponse) => {
				// Re-enable the form
				this.studentForm.enable();

				if(response.message === this._globalService.httpValidationErrorMessage) {
					this.studentForm = this._globalService.getValidationErrors(this.studentForm, response);

					// Set the alert
					this.alert = {
						type: 'error',
						message: `${response.message}`,
					};

					// Show the alert
					this.showAlert = true;
				}
			},
		);
	}

	updateStudent(): void {
		this.studentForm.markAllAsTouched();
		// Return if the form is invalid
		if (this.studentForm.invalid) {
			return;
		}

		// Disable the form
		this.studentForm.disable();

		// Hide the alert
		this.showAlert = false;

		// Sign in
		this._studentsService
			.update(this.studentID, this.studentForm.value)
			.pipe()
			.subscribe(
				() => {
					this.studentForm.enable();
					this._router.navigate(['/alumnos/lista', {m: 2}]);
				},
				(response: HttpValidationErrorResponse) => {
					// Re-enable the form
					this.studentForm.enable();

					if(response.message === this._globalService.httpValidationErrorMessage) {
						this.studentForm = this._globalService.getValidationErrors(this.studentForm, response);

						// Set the alert
						this.alert = {
							type: 'error',
							message: `${response.message}`,
						};

						// Show the alert
						this.showAlert = true;
					}
				},
			);
	}
}
