import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
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

	searchFC = new FormControl();
  constructor(
		private _studentsService: StudentsService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _globalService: GlobalService,
		private _fuseConfirmationService: FuseConfirmationService
	) { }

	paginate(event: PaginatorEvent): void {
		this.getStudents({searchString: this.searchFC.value}, {page: event.pageIndex + 1, perPage: event.pageSize});
	}

  ngOnInit(): void {


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
		const value = {searchString: this.searchFC.value}
		this.getStudents(value);
		// const filterValue = value.toLowerCase();
		// return this.files.filter(option => option.toLowerCase().includes(filterValue));
	}



	resendSignUpEmail(id: number): void{
		this._studentsService.resendSignUpEmail(id).subscribe((response) => {
			this._globalService.openSnackBar('Correo enviado', 5000, 'success');
			console.log(response);
		});
	}

	deleteStudent(id: number): void{

		const dialogRef = this._fuseConfirmationService.open({
			title: 'Atención',
			message: '¿Está seguro que desea eliminar este alumno? La información de pagos también se eliminará. Esta acción no se puede deshacer.',
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
				this._studentsService.delete(id).subscribe((response) => {
					this._globalService.openSnackBar('Alumno eliminado', 5000, 'success');
					this.dataSource.data = this.dataSource.data.filter((student) => student.id !== id);
				});
			}
		});
	}
}
