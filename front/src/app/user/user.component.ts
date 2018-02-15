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

	ngOnInit() { }
}
