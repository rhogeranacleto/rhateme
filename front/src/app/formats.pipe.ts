import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'round'
})
export class RoundPipe implements PipeTransform {

	transform(value: number, fixed: number = 2): any {

		const decimal = new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`);

		return value.toString().match(decimal)[0];
	}
}