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
import { UserService } from '../user/user.service';

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

	@Input() ever?: number;

	hourTime: string;

	constructor() { }

	ngOnInit() {

		this.rate = this.note;
	}

	ngOnChanges(changes: SimpleChanges) {

		const userId: SimpleChange = changes.userId;
		const ever: SimpleChange = changes.ever;

		if (userId) {

			if (userId.previousValue !== userId.currentValue) {

				this.rate = null;
			}
		}

		if (ever) {

			if (ever.currentValue) {

				this.hourTime = UserService.sessionUser.rate.toFixed(2);
				this.rate = this.ever;
			}
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
