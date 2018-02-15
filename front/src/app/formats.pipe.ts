import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'round'
})
export class RoundPipe implements PipeTransform {

	transform(value?: number, fixed: number = 2): string {

		if (value || value === 0) {

			const decimal = new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`);

			let n = value.toString().match(decimal)[0].replace('.', ',');

			if (n.indexOf(',') < 0) {

				n += ',000';
			}

			while (n.length < 5) {

				n += '0';
			}

			return n;
		}

		return '';
	}
}