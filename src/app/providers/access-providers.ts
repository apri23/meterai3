import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProvider{

	server: string = 'http://localhost:8080/wom_admin/Mobile_Api/';
	// server: string = 'https://meterai.posindonesia.co.id/dev/Mobile_Api/';
	// server: string = 'https://meterai.posindonesia.co.id/Mobile_Api/';

	constructor(
		public http: HttpClient
	) {	}

	postData(body, file){
		let headers = new HttpHeaders({
			'Authorization': 'possale-7afe44278f6eca70e119035e6ae0e002'
			// 'Authorization': 'possale_wom-ec23210baf490fd837641de501514548'
		});
		let options = {
			headers: headers
		}

		return this.http.post(this.server + file, JSON.stringify(body), options)
		.timeout(59000)
		.map(res => res);
	}
}