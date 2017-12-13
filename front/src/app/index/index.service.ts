import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../user/user';

@Injectable()
export class IndexService {

	constructor(
		private http: HttpClient) { }

	getUser(name: string) {

		return this.http.get<IUser>('/user/' + name).toPromise();
	}
}
