import { Request, ReplyNoContinue } from 'hapi';
import { UserController } from './controller';

export class UserMiddleware {

	static getAll(request: Request, reply: ReplyNoContinue) {

		UserController.getAll().then(users => {

			reply(users);
		});
	}
}