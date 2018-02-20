import { Request, ReplyNoContinue } from 'hapi';
import { UserController } from './controller';
import { IUser } from './model';

export class UserMiddleware {

	static getAll(request: Request, reply: ReplyNoContinue) {

		UserController.getAll().then(users => {

			reply(users);
		});
	}

	static getOne(request: Request, reply: ReplyNoContinue) {

		UserController.getOne(request.params.name).then(user => {

			reply(user);
		}).catch(err => {

			reply(err.message || 'erro interno').code(err.code || 500);
		});
	}

	static addNoteToUser(request: Request, reply: ReplyNoContinue) {

		const user: IUser = request.auth.credentials

		UserController.addNoteToUser(request.params.id, request.payload.note, user.id, user.rate).then(user => {

			reply(user);
		}).catch(err => {

			reply(err.message || 'erro interno').code(err.code || 500);
		});
	}

	static auth(request: Request, reply: ReplyNoContinue) {

		UserController.auth(request.payload.auth).then(user => {

			reply(user);
		}).catch(err => {

			reply(err.message || 'erro interno').code(err.code || 500);
		});
	}

	static note(request: Request, reply: ReplyNoContinue) {

		UserController.note(request.params.id).then(user => {

			reply(user);
		}).catch(err => {

			reply(err.message || 'erro interno').code(err.code || 500);
		});
	}
}