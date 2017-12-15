import {
	Component,
	OnInit,
	EventEmitter,
	Output,
	OnChanges,
	SimpleChanges,
	Input,
	SimpleChange
} from '@angular/core';

@Component({
	selector: 'app-starts-ratings',
	templateUrl: './starts-ratings.component.html',
	styleUrls: ['./starts-ratings.component.css']
})
export class StartsRatingsComponent implements OnInit, OnChanges {

	rate: number;

	@Output()
	call: EventEmitter<number> = new EventEmitter();

	@Input() userId: string;

	@Input() note: number;

	constructor() { }

	ngOnInit() {

		this.rate = this.note;
	}

	ngOnChanges(changes: SimpleChanges) {

		const userId: SimpleChange = changes.userId;

		if (userId.previousValue !== userId.currentValue) {

			this.rate = null;
		}
	}

	onSelectionChange(rate: number) {

		this.rate = rate;

		this.call.emit(this.rate);
	}

	chama() {

		this.call.emit(this.rate);
	}
}
