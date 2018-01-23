import { UserModel, IUser } from './model';
import { Instagram } from '../Instagram';
// import { event } from '../Brain';

export class UserController {

	static getAll() {

		return UserModel.getAverage('5a316c396bb97148b5adddd9');
	}

	static getOne(username: string) {

		return UserModel.findOne({
			username
		}).then(user => {// .select('-notes')

			if (user) {

				return user;
			}

			return UserController.findUserInstagram(username);
		});
	}

	static note(id: any) {

		return UserModel.getAverage(id);
	}

	private static findUserInstagram(username: string) {

		return Instagram.searchUser(username).catch(err => {

			throw {
				code: 404,
				message: 'Usuário não encontrado'
			};
		}).then(user => {

			return new UserModel({
				username: user.username,
				full_name: user.full_name,
				profile_pic_url: user.profile_pic_url,
				followed_by: user.followed_by.count,
				instagram_id: Number(user.id)
			}).save();
		});
	}

	static addNoteToUser(id: string, note: number, ownerId: string): Promise<IUser> {

		return Promise.all([
			UserModel.findById(id).then(u => u),
			UserModel.findById(ownerId).then(u => u)
		]).then((data: [IUser | null, IUser | null]) => {

			let user = data[0];
			let owner = data[1];

			if (user && owner) {

				user.notes.push({
					value: note,
					owner_id: ownerId,
					weight: owner.rate
				});

				return user.save();
			}

			throw {
				code: 404,
				message: 'Não econtrado'
			};
		}).then(user => {

			// event.emit('new-note', user);

			return user.updateAverage();
		});
	}

	static auth(auth: string) {

		return Instagram.auth(auth).then(user => {

			return UserModel.findByInstaIdOrCreate(user);
		});
	}
}