import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndexService } from './index.service';
import { IUser } from '../user/user';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user/user.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

	form: FormGroup;

	name: string;

	paramSubscribe: Subscription;

	user: IUser;

	note: number;

	constructor(
		private formBuilder: FormBuilder,
		private indexService: IndexService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private location: Location) { }

	ngOnInit() {

		this.form = this.formBuilder.group({
			name: [null, [
				Validators.required
			]]
		});

		this.paramSubscribe = this.route.params.subscribe(params => {

			if (params['username']) {

				this.name = params['username'];
				this.getUser();
			}
		});

		if (this.router.url.indexOf('#access_token') >= 0) {

			this.instagramAuth(/.+#access_token=(.+)/.exec(this.router.url)[1]);
		}

		this.route.queryParams.subscribe(query => {

			if (query['data']) {

				const data = query['data'].split('+++');

				this.setState(data[0], +data[1]);
			}
		});
	}

	getUser() {

		return this.indexService.getUser(this.name).then(user => {

			this.user = user;
		}).catch(err => {

			this.user = null;
		});
	}

	search() {

		this.router.navigate(['/' + this.name]);
	}

	instagramAuth(auth: string) {

		this.indexService.auth(auth).then(user => {

			user.token = auth;

			this.userService.sessionUser = user;
		});
	}

	setState(username: string, note: number) {

		this.name = username;
		this.location.go('/' + this.name);

		this.getUser();

		this.note = note;
	}

	ngOnDestroy(): void {

		this.paramSubscribe.unsubscribe();
	}
}
