import { UserModel } from './model';
import { Instagram } from '../Instagram';

export class UserController {

	static getAll() {

		return UserModel.find();
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
				followed_by: user.followed_by.count
			}).save();
		});
	}

	static addNoteToUser(id: string, note: number) {

		return UserModel.findById(id).then(user => {

			if (user) {

				user.notes.push({
					value: note
				});

				return user.save();
			}

			throw {
				code: 404,
				message: 'Não econtrado'
			};
		});
	}
}