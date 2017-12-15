import * as rpn from 'request-promise-native';

export class Instagram {

	static searchUser(name: string) {

		return rpn.get(`https://www.instagram.com/${name}?__a=1`, {
			json: true
		}).then(data => {

			return data.user;
		});
	}

	static auth(auth: string) {

		return rpn.get('https://api.instagram.com/v1/users/self/?access_token=' + auth, {
			json: true
		}).then(data => {

			return data.data;
		});
	}
}