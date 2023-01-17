import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentControlService {

  constructor(
		private _httpClient: HttpClient
	)
	 { }

	 getDolarBCV(): Observable<any> {
		// Scraping the BCV website
		return this._httpClient.get(`${environment.api}/dolar-bcv`);
	 }

	 updateMonthPrice(price): Observable<any> {
		return this._httpClient.post(`${environment.api}/payment-control/update-month-price`, {price});
	 }

	 getYears(): Observable<any> {
		return this._httpClient.get(`${environment.api}/payment-control/get-years`);
	 }

	 getMonthPrice(): Observable<any> {
		return this._httpClient.get(`${environment.api}/payment-control/get-month-price`);
	 }

}