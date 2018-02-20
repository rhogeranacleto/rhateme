import { Request } from "hapi";
import { UserModel } from "./user/model";
import { Instagram } from "./Instagram";

export function Authenticate(req: Request, id: string, token: string, next: (e: any | null, isValid: boolean, user?: any) => void) {

	return Promise.all([
		UserModel.findById(id).select('-notes').exec(),
		Instagram.auth(token)
	]).then(data => {

		const user = data[0];
		const instaUser = data[1];

		if (user) {

			if (instaUser && user.instagram_id === instaUser.id) {

				return next(null, true, user);
			}

			return next(new Error('expired token'), false);
		}

		return next(new Error('invalid id'), false);
	}).catch(err => {

		if (err.error.meta.code === 400) {

			return next('token_expired', false);
		}

		return next(err, false);
	});
}