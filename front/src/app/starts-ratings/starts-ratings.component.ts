import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-starts-ratings',
	templateUrl: './starts-ratings.component.html',
	styleUrls: ['./starts-ratings.component.css']
})
export class StartsRatingsComponent implements OnInit {

	rate: number;

	constructor() { }

	ngOnInit() {
	}

	onSelectionChange(rate: number) {

		this.rate = rate;
	}
}
