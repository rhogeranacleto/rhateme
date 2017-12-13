import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user';

@Injectable()
export class UserService {

	constructor(
		private http: HttpClient) { }

	addNoteToUser(id: string, note: number) {

		return this.http.put<IUser>(`/user/${id}/note`, {
			note
		}).toPromise();
	}
}
