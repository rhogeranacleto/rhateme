import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndexService } from './index.service';
import { IUser } from '../user/user';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

	form: FormGroup;

	name: string;

	sub: Subscription;

	user: IUser;

	constructor(
		private formBuilder: FormBuilder,
		private indexService: IndexService,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {

		this.form = this.formBuilder.group({
			name: [null, [
				Validators.required
			]]
		});

		this.sub = this.route.params.subscribe(params => {

			if (params['username']) {

				this.name = params['username'];
				this.getUser();
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

	ngOnDestroy(): void {

		this.sub.unsubscribe();
	}
}
