import { Component, OnInit, Input } from '@angular/core';
import { IUser } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	@Input() user: IUser;

	@Input() note: number;

	constructor(
		private userService: UserService) { }

	ngOnInit() {

		if (this.note) {

			this.rated(this.note);
		}
	}

	rated(note: number) {

		if (this.userService.isLogged) {

			this.userService.addNoteToUser(this.user.id, note).then(user => {

				console.log(user);
			});
		} else {

			const redirect = `http://localhost:4220?data=${this.user.username}+++${note}`;

			window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=0cbd3e97ae9049a0aad3ea7ce155c0f9&redirect_uri=${redirect}&response_type=token`;
		}
	}
}
