import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { UserService } from './user/user.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const clone = {
			url: environment.api + req.url
		};

		if (UserService.isLogged) {

			(<any>clone).setHeaders = {
				Authorization: 'Basic ' + btoa(`${UserService.sessionUser._id}:${UserService.sessionUser.token}`)
			};
		}

		const runReq = req.clone(clone);

		return next.handle(runReq);
	}
}