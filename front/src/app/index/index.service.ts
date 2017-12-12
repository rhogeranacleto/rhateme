import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class IndexService {

	constructor(
		private http: HttpClient) { }

	getUser(name: string) {

		return this.http.get<User>('/user/' + name).toPromise();
	}
}
