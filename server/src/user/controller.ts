import { UserModel } from './model';

export class UserController {

	static getAll() {

		return UserModel.find();
	}
}