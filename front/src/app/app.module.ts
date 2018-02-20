import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Interceptor } from './interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IndexService } from './index/index.service';
import { UserComponent } from './user/user.component';
import { StartsRatingsComponent } from './starts-ratings/starts-ratings.component';
import { UserService } from './user/user.service';
import { RoundPipe } from './formats.pipe';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
	{
		path: ':username',
		component: IndexComponent
	},
	{
		path: '',
		pathMatch: 'full',
		component: IndexComponent
	}
];

@NgModule({
	declarations: [
		AppComponent,
		IndexComponent,
		UserComponent,
		StartsRatingsComponent,
		RoundPipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule.forRoot(
			appRoutes
		),
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: Interceptor,
			multi: true,
		},
		IndexService,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
