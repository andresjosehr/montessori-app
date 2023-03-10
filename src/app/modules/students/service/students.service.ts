import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Student } from 'app/interfaces/entities/student';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { HttpSimpleResponse } from 'app/interfaces/http-responses/http-simple-response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
		private _httpClient: HttpClient
	) { }


	getList(search: SearchObject, paginatorParams?: PaginatorParams): Observable<any> {
		console.log(search);
		const params = new HttpParams({
			fromObject: {
				...paginatorParams,
				...search
			},
		} as any);

		return this._httpClient.get<any>(`${environment.api}/students`, {params});
	}

	getAll(search: SearchObject): Observable<any> {
		const params = new HttpParams({
			fromObject: {
				...search
			},
		} as any);

		return this._httpClient.get<any>(`${environment.api}/students/get-all`, {params});
	}

	get(id: string | number): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/students/${id}`);
	}

	uploadFile(file: File): Observable<HttpSimpleResponse> {
		const formData = new FormData();
		formData.append('file', file, file.name);

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');

		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/students/upload-file`, formData, {headers});
	}

	create(data: any): Observable<HttpSimpleResponse> {
		const formData = new FormData();

		for (const key in data) {
			if (data.hasOwnProperty(key) && key !== 'img' && key !== 'broker_logo') {
				const element = data[key];
				formData.append(key, element);
			}
		}

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');

		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/students`, formData, {headers});
	}
	update(id: string, data: any): Observable<HttpSimpleResponse> {

		const formData = new FormData();

		for (const key in data) {
			if (data.hasOwnProperty(key) && key !== 'img' && key !== 'broker_logo') {
				const element = data[key];
				formData.append(key, element);
			}
		}

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');
		headers.append('_method', 'PUT');

		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/students/${id}?_method=PUT`, formData, {headers});
	}

	getPropertyEntities(): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/students/get-property-entities`);
	}

	completeSignUp(alumno: any, token: string): Observable<HttpSimpleResponse> {
		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/students/complete-signup/${token}`, alumno);
	}

	resendSignUpEmail(id: number): Observable<HttpSimpleResponse> {
		return this._httpClient.get<HttpSimpleResponse>(`${environment.api}/students/resend-signup-email/${id}`, {});
	}

	getAllLevels(): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/get-all-levels`);
	}

	registerPayment(studentID: any, data: studentPayment): Observable<any> {
		return this._httpClient.post<any>(`${environment.api}/students/register-payment/${studentID}`, data);
	}

	registerEnrollmentPayment(studentID: any, data: studentPayment): Observable<any> {
		return this._httpClient.post<any>(`${environment.api}/students/register-enrollment-payment/${studentID}`, data);
	}

	getEnrollmentPayments(studentID: any): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/students/get-enrollment-payment/${studentID}`);
	}

	getPayments(studentID: any, year: number): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/students/payment-control/${studentID}/${year}`);
	}

	delete(id: string | number): Observable<HttpSimpleResponse> {
		return this._httpClient.delete<HttpSimpleResponse>(`${environment.api}/students/${id}`);
	}

}

interface studentPayment {
	full_name: string;
	document: string;
	payment_date: string;
	payment_method: string;
	reference_number: number;
	payer_type: string;
}

export interface SearchObject{
	searchString?: string;
}
