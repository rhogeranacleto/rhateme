import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Interceptor } from './interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IndexService } from './index/index.service';
import { UserComponent } from './user/user.component';
import { StartsRatingsComponent } from './starts-ratings/starts-ratings.component';

@NgModule({
	declarations: [
		AppComponent,
		IndexComponent,
		UserComponent,
		StartsRatingsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: Interceptor,
			multi: true,
		},
		IndexService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
