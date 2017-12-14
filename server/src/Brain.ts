import { EventEmitter } from 'events';
import { TodoModel } from './task/model';
import { IUser } from './user/model';

export const event = new EventEmitter();

event.on('new-note', function (userId: string) {

	TodoModel.checkExistsTaskOfuser(userId).then(exists => {

		if (!exists) {

			Brain.newNote(userId);
		}
	});
});

event.on('execute', function () {

	Brain.executeNext();
});

class Brain {

	private static working = false;

	static newNote(userId: String) {

		TodoModel.create({
			userId
		}).then(task => {

			if (!Brain.working) {

				Brain.executeNext();
			}
		});
	}

	static executeNext() {

		Brain.working = true;

		TodoModel.getNextUserToProcess().then<IUser | undefined>(user => {

			if (user) {

				return user.updateAverage();
			}
		}).then(user => {

			if (user) {

				event.emit('execute');
			}

			Brain.working = false;
		});
	}
}
