import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services.
import {
	Locale,
	TranslatePipe,
	LocaleService,
	LocalizationService
} from 'angular2localization/angular2localization';
import { AuthService } from "../../service/auth/auth.service";

// Angular 2 Material.
import { MdButton } from '@angular2-material/button';
import { MdRadioButton } from '@angular2-material/radio/radio';
import { MdRadioDispatcher } from '@angular2-material/radio/radio_dispatcher';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

import {RestService} from "../../service/rest.service";

@Component({
	selector: 'login',
	templateUrl: 'app/shared/template/login/login.component.html',
	pipes: [TranslatePipe],
	providers: [MdRadioDispatcher, AuthService, RestService],
	directives: [MD_CARD_DIRECTIVES, MdRadioButton, MD_INPUT_DIRECTIVES, MdButton]
})

export class LoginComponent extends Locale {

	public model = {
		search: ""
	};
	public user = {
		username: "test",
		password: "test"
	};
	error: boolean = false;

	constructor(public router: Router,
	            public auth: AuthService,
	            public locale: LocaleService,
	            public localization: LocalizationService,
				public rest: RestService
	) {
		super(locale, localization);
	}

token = localStorage.getItem('token');

	onSubmit() {
		this.auth.login(this.user.username, this.user.password).subscribe
		(
		(token: any) => {

				this.token = token;
				this.router.navigate(['/home']);
			}, () => {
				console.log('llego a la shit');
				this.error = true;
			}
		);

		//console.log("llego"+this.user.username);

		/*
		this.rest.post("tp-main","login", {"username":this.user.username,"password":this.user.password }).then(
			(result: any)=>console.log(result),
			(reason: string)=>console.log('REJECTED: '+ reason)

		);*/

	}
}