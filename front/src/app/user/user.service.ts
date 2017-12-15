import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user';

@Injectable()
export class UserService {

	constructor(
		private http: HttpClient) { }

	get sessionUser(): IUser {

		return JSON.parse(sessionStorage.getItem('sessionUser'));
	}

	set sessionUser(user: IUser) {

		sessionStorage.setItem('sessionUser', JSON.stringify(user));
	}

	get isLogged(): boolean {

		return !!this.sessionUser;
	}

	addNoteToUser(id: string, note: number) {

		return this.http.put<IUser>(`/user/${id}/note`, {
			note,
			owner: this.sessionUser.id
		}).toPromise();
	}
}