import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndexService } from './index.service';
import { User } from './user';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

	form: FormGroup;

	name: string;

	user: User;

	constructor(
		private formBuilder: FormBuilder,
		private indexService: IndexService) { }

	ngOnInit() {

		this.form = this.formBuilder.group({
			name: [null, [
				Validators.required
			]]
		});
	}

	search() {

		return this.indexService.getUser(this.name).then(user => {

			this.user = user;
		});
	}
}
