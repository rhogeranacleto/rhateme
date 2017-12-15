import { Request, ReplyNoContinue } from 'hapi';
import { UserController } from './controller';

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

		UserController.addNoteToUser(request.params.id, request.payload.note, request.payload.owner).then(user => {

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
}