import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndexService } from './index.service';
import { IUser } from '../user/user';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user/user.service';
import { Location } from '@angular/common';
import { RoundPipe } from '../formats.pipe';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

	form: FormGroup;

	name: string;

	paramSubscribe: Subscription;

	user?: IUser;

	set _user(user: IUser) {

		this.user = user;

		document.getElementById('note').innerText = new RoundPipe().transform(user ? user.rate : 0, 3);
		document.getElementById('noteCount').innerText = (user ? user.count : 0).toString();
	}

	get background() {

		if (this.user && this.user.profile_pic_url_hd) {

			return this.user.profile_pic_url_hd;
		}

		return 'https://media.istockphoto.com/photos/abstract-network-connection-background-picture-id509731276?k=6&m=509731276&s=612x612&w=0&h=C8_3Gb8V7DHKZnO1BP-BHYKYfTvxxqJAM29OtvaC7Qs=';
	}

	note: number;

	ever?: number;

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

			this.instagramAuth(/.+#access_token=(.+)/.exec(this.router.url)[1]).then(() => {

				this.getData();
			});
		}
	}

	getUser() {

		return this.indexService.getUser(this.name).then(user => {

			this._user = user;
			this.ever = null;
		}).catch(err => {

			this._user = null;
		});
	}

	rated(note: number) {

		if (this.userService.isLogged) {

			this.userService.addNoteToUser(this.user.id, note).then(user => {

				this._user = user;
			}).catch((err: HttpErrorResponse) => {

				if (err.status === 405) {

					this.ever = err.error;
				}
			});
		} else {

			const redirect = `${environment.redirect}?data=${this.user.username}+++${note}`;

			window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=0cbd3e97ae9049a0aad3ea7ce155c0f9&redirect_uri=${redirect}&response_type=token`;
		}
	}

	search() {

		this.router.navigate(['/' + this.name]);
	}

	instagramAuth(auth: string) {

		return this.indexService.auth(auth).then(user => {

			user.token = auth;

			this.userService.sessionUser = user;
		});
	}

	getData() {

		this.route.queryParams.subscribe(query => {

			if (query['data']) {

				const data = query['data'].split('+++');

				this.setState(data[0], +data[1]);
			}
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
