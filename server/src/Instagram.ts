import * as rpn from 'request-promise-native';

export interface IInstagramUserSelf {
	id: string;
	username: string;
	full_name: string;
	profile_picture: string;
}

export interface IInstagramUser {
	biography: string;
	full_name: string;
	id: string;
	username: string;
	profile_pic_url_hd: string;
	media: {
		count: number;
		nodes: {
			caption: string;
			display_src: string;
		}[]
	}
}

export class Instagram {

	static searchUser(name: string): Promise<IInstagramUser> {

		return rpn.get(`https://www.instagram.com/${name}?__a=1`, {
			json: true
		}).then(data => {

			return data.user;
		});
	}

	static auth(auth: string): Promise<IInstagramUserSelf> {

		return rpn.get('https://api.instagram.com/v1/users/self/?access_token=' + auth, {
			json: true
		}).then(data => {

			return data.data;
		});
	}
}