import { Component, OnInit, Input } from '@angular/core';
import { IUser } from './user';
import { UserService } from './user.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	@Input() user: IUser;

	constructor(
		private userService: UserService) { }

	ngOnInit() {
	}

	rated(note: number) {

		this.userService.addNoteToUser(this.user.id, note).then(user => {

			console.log(user);
		});
	}
}
