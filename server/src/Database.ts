import { IUser, UserSchema } from './user/model';
import * as Mongoose from 'mongoose';

export interface IDatabase {
	User: Mongoose.Model<IUser>;
}

export function dbConnect(): IDatabase {

	(<any>Mongoose).Promise = global.Promise;

	Mongoose.connect(process.env.DB || 'mongodb://localhost:27017/rhateme', {
		useMongoClient: true
	});

	const mongoDb = Mongoose.connection;

	mongoDb.on('error', () => {

		console.log(`Unable to connect to database`);
	});

	mongoDb.once('open', () => {

		console.log(`Connected to database!`);
	});

	return {
		User: Mongoose.model<IUser, Mongoose.Model<IUser>>('User', UserSchema)
	};
}