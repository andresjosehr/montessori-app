import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/interfaces/entities/user';
import { PaginatorParams } from 'app/interfaces/general/paginator-params';
import { HttpSimpleResponse } from 'app/interfaces/http-responses/http-simple-response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
		private _httpClient: HttpClient
	) { }


	getList(search: SearchObject, paginatorParams?: PaginatorParams): Observable<any> {
		const params = new HttpParams({
			fromObject: {
				...paginatorParams,
				...search
			},
		} as any);

		return this._httpClient.get<any>(`${environment.api}/users`, {params});
	}

	getAll(search: SearchObject): Observable<any> {
		const params = new HttpParams({
			fromObject: {
				...search
			},
		} as any);

		return this._httpClient.get<any>(`${environment.api}/users/get-all`, {params});
	}

	get(id: string): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/users/${id}`);
	}

	uploadFile(file: File): Observable<HttpSimpleResponse> {
		const formData = new FormData();
		formData.append('file', file, file.name);

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');

		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/users/upload-file`, formData, {headers});
	}

	create(data: any): Observable<HttpSimpleResponse> {
		const formData = new FormData();

		for (const key in data) {
			if (data.hasOwnProperty(key) && key !== 'img' && key !== 'broker_logo') {
				const element = data[key];
				formData.append(key, element);
			}
		}

		if(data.img_changed && data.img)
			formData.append('img', data.img, data.img?.name)
		else
		formData.append('img', '')

		if(data.broker_logo_changed && data.broker_logo)
			formData.append('broker_logo', data.broker_logo, data.broker_logo?.name)
		else
			formData.append('broker_logo', '');

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');

		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/users`, formData, {headers});
	}
	update(id: string, data: any): Observable<HttpSimpleResponse> {

		const formData = new FormData();

		for (const key in data) {
			if (data.hasOwnProperty(key) && key !== 'img' && key !== 'broker_logo') {
				const element = data[key];
				formData.append(key, element);
			}
		}

		if(data.img_changed && data.img)
			formData.append('img', data.img, data.img?.name)
		else
		formData.append('img', '')

		if(data.broker_logo_changed && data.broker_logo)
			formData.append('broker_logo', data.broker_logo, data.broker_logo?.name)
		else
			formData.append('broker_logo', '');

		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');
		headers.append('_method', 'PUT');

		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/users/${id}?_method=PUT`, formData, {headers});
	}

	getPropertyEntities(): Observable<any> {
		return this._httpClient.get<any>(`${environment.api}/users/get-property-entities`);
	}

	completeSignUp(usuario: User, token: string): Observable<HttpSimpleResponse> {
		return this._httpClient.post<HttpSimpleResponse>(`${environment.api}/users/complete-signup/${token}`, usuario);
	}

	resendSignUpEmail(id: number): Observable<HttpSimpleResponse> {
		return this._httpClient.get<HttpSimpleResponse>(`${environment.api}/users/resend-signup-email/${id}`, {});
	}

	delete(id: string | number): Observable<HttpSimpleResponse> {
		return this._httpClient.delete<HttpSimpleResponse>(`${environment.api}/users/${id}`);
	}

}


export interface SearchObject{
	city?: string;
	company?: string;
	profession?: string;
	file?: string;
}
