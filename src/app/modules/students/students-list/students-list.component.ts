import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorEvent } from 'app/interfaces/general/paginator-event';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { GlobalService } from 'app/services/global/global.service';
import { Subject, takeUntil } from 'rxjs';
import { StudentsService, SearchObject } from '../service/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

	columns: Array<string> = ['id', 'name', 'last_name', 'representative_name', 'representative_phone', 'Grado', 'acciones'];
	dataSource: MatTableDataSource<any>;
	studentsPaginated: any;
	m: '1' | '2' | null = null;
	_unsubscribeAll: Subject<any> = new Subject<any>();
	//
	file: File;

	files: any; filesFiltered: any;;
	cities: any; 	citiesFiltered: any;;
	companies: any; 	companiesFiltered: any;;
	professions: any; 	professionsFiltered: any;;

	seachFormGroup: FormGroup;
  constructor(
		private _studentsService: StudentsService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _globalService: GlobalService
	) { }

	paginate(event: PaginatorEvent): void {
		this.getStudents(this.getValues(), {page: event.pageIndex + 1, perPage: event.pageSize});
	}

  ngOnInit(): void {
		this.seachFormGroup = this._formBuilder.group({
			file: [null], city: [null], company: [null], profession: [null],
			fileSelect: ['Seleccionar'], citySelect: ['Seleccionar'], companySelect: ['Seleccionar'], professionSelect: ['Seleccionar'],
		});

		this._activatedRoute.params.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
			if (params.m) {
				this.m = params.m;
			}
		});
		this.getStudents({});
  }

	getStudents(search: SearchObject, paginatorParams: PaginatorParams = {page: 1, perPage: 10}): void {
		this._studentsService.getList(search, paginatorParams).subscribe((response: any) => {
			this.dataSource = new MatTableDataSource(response.data.data);
			this.studentsPaginated = response.data;
		});
	}


	filter(value: string, array: any): any {
		const filterValue = value.toLowerCase();
		return array.filter(option => (option || '').toLowerCase().includes(filterValue));
	}

	fileChange(file: File): void{
		this.file = file;
	}

	goToStudent(id: string): void{
		this._router.navigate(['alumnos', 'editar', id]);
	}

	goToPaymentControl(id: string): void{
		this._router.navigate(['alumnos', 'control-de-pago', id]);
	}

	uploadFile(): void{
		this._studentsService.uploadFile(this.file).subscribe((response) => {
			console.log(response);
		});
	}

	filterStudents(): void {
		console.log(this.getValues());
		this.getStudents(this.getValues());
		// const filterValue = value.toLowerCase();
		// return this.files.filter(option => option.toLowerCase().includes(filterValue));
	}

	getValues(): SearchObject{
		const values = {};
		if(this.seachFormGroup.value.fileSelect && this.seachFormGroup.value.fileSelect!=='Seleccionar'){
			values['file'] = this.seachFormGroup.value.fileSelect;
		}
		if(this.seachFormGroup.value.citySelect && this.seachFormGroup.value.citySelect!=='Seleccionar'){
			values['city'] = this.seachFormGroup.value.citySelect;
		}
		if(this.seachFormGroup.value.companySelect && this.seachFormGroup.value.companySelect!=='Seleccionar'){
			values['company'] = this.seachFormGroup.value.companySelect;
		}
		if(this.seachFormGroup.value.professionSelect && this.seachFormGroup.value.professionSelect!=='Seleccionar'){
			values['profession'] = this.seachFormGroup.value.professionSelect;
		}
		return values;
	}

	export(): void{
		this._studentsService.getAll(this.getValues()).subscribe((response) => {
			const fileName = 'studentos';
			this._globalService.saveDataAsCSV(response.data, fileName);
		});
	}

	resendSignUpEmail(id: number): void{
		this._studentsService.resendSignUpEmail(id).subscribe((response) => {
			this._globalService.openSnackBar('Correo enviado', 5000, 'success');
			console.log(response);
		});
	}


}
