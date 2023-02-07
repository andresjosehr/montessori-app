import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PaginatorEvent } from 'app/interfaces/general/paginator-event';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { GlobalService } from 'app/services/global/global.service';
import { Subject, takeUntil } from 'rxjs';
import { UsersService, SearchObject } from '../service/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

	columns: Array<string> = ['id', 'nombres', 'email', 'role', 'status','acciones'];
	dataSource: MatTableDataSource<any>;
	usersPaginated: any;
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
		private _usersService: UsersService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _fuseConfirmationService: FuseConfirmationService,
		private _globalService: GlobalService
	) { }

	paginate(event: PaginatorEvent): void {
		this.getUsers(this.getValues(), {page: event.pageIndex + 1, perPage: event.pageSize});
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
		this.getUsers({});
  }

	getUsers(search: SearchObject, paginatorParams: PaginatorParams = {page: 1, perPage: 10}): void {
		this._usersService.getList(search, paginatorParams).subscribe((response: any) => {
			this.dataSource = new MatTableDataSource(response.data.data);
			this.usersPaginated = response.data;
		});
	}


	filter(value: string, array: any): any {
		const filterValue = value.toLowerCase();
		return array.filter(option => (option || '').toLowerCase().includes(filterValue));
	}

	fileChange(file: File): void{
		this.file = file;
	}

	goToUser(id: string): void{
		this._router.navigate(['usuarios', 'editar', id]);
	}

	uploadFile(): void{
		this._usersService.uploadFile(this.file).subscribe((response) => {
			console.log(response);
		});
	}

	filterUsers(): void {
		console.log(this.getValues());
		this.getUsers(this.getValues());
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
		this._usersService.getAll(this.getValues()).subscribe((response) => {
			const fileName = 'useros';
			this._globalService.saveDataAsCSV(response.data, fileName);
		});
	}

	resendSignUpEmail(id: number): void{
		this._usersService.resendSignUpEmail(id).subscribe((response) => {
			this._globalService.openSnackBar('Correo enviado', 5000, 'success');
			console.log(response);
		});
	}

	deleteUser(id: number): void{

		const dialogRef = this._fuseConfirmationService.open({
			title: 'Atención',
			message: '¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer.',
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
				this._usersService.delete(id).subscribe((response) => {
					this._globalService.openSnackBar('Alumno eliminado', 5000, 'success');
					this.dataSource.data = this.dataSource.data.filter((student) => student.id !== id);
				});
			}
		});
	}


}
