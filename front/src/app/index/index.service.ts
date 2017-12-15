import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../user/user';

@Injectable()
export class IndexService {

	constructor(
		private http: HttpClient) { }

	auth(auth: string) {

		return this.http.post<IUser>('/user/instagram/auth', {
			auth
		}).toPromise();
	}

	getUser(name: string) {

		return this.http.get<IUser>('/user/' + name).toPromise();
	}
}
