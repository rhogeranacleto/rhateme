import { Document, Schema, model, Model, Types } from 'mongoose';
import * as moment from 'moment';

export interface INote {
	value: number;
	owner_id: string;
	weight: number;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	readonly _id?: String;
}

export interface IUser extends Document {
	username: string;
	full_name: string;
	profile_pic_url: string;
	profile_pic_url_hd: string;
	followed_by: number;
	rate: number;
	notes: INote[];
	count: number;
	instagram_id: number;
	readonly created_at: Date;
	readonly updated_at: Date;
	updateAverage(): Promise<this>;
}

export const NoteSchema = new Schema({
	value: {
		type: Number,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	owner_id: Schema.Types.ObjectId
}, {
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		},
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	});

export const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	full_name: String,
	profile_pic_url: String,
	profile_pic_url_hd: String,
	followed_by: Number,
	instagram_id: {
		type: Number,
		required: true
	},
	rate: {
		type: Number,
		default: 0
	},
	count: {
		type: Number,
		default: 0
	},
	notes: [NoteSchema]
}, {
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		},
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	});

export interface IInstagramUser {
	id: string;
	username: string;
	full_name: string;
	profile_picture: string;
}
interface IUserModel extends Model<IUser> {
	getAverage(userId: string): Promise<IAverage>;
	findByInstaIdOrCreate(instaUser: IInstagramUser): Promise<IUser>;
	findLastRateOfUser(id: string, owner_id: string): Promise<INote | null>;
}

interface IAverage {
	avg: number;
	count: number;
}

class User {

	static getAverage(userId: string) {

		return UserModel.aggregate().unwind('$notes').match({
			_id: Types.ObjectId(userId)
		}).group({
			_id: '$_id',
			count: { $sum: 1 },
			numerator: { $sum: { $multiply: ["$notes.value", "$notes.weight"] } },
			denominator: { $sum: "$notes.weight" }
		}).project({
			avg: { $divide: ['$numerator', '$denominator'] },
			count: '$count'
		}).limit(1).then(obj => {

			return (<IAverage>obj[0]);
		});
	}

	static findLastRateOfUser(_id: string, owner_id: string) {

		return UserModel.findOne({
			_id,
			'notes.owner_id': owner_id,
			'notes.created_at': {
				$lt: moment().add(1, 'd').startOf('d').toDate(),
				$gte: moment().startOf('d').toDate()
			}
		}, {
				notes: {
					$elemMatch: {
						owner_id,
						created_at: {
							$lt: moment().add(1, 'd').startOf('d').toDate(),
							$gte: moment().startOf('d').toDate()
						}
					}
				}
			}).then(u => {

				return u ? u.notes[0] : null;
			});
	}

	static findByInstaIdOrCreate(instaUser: IInstagramUser) {

		return UserModel.findOne({
			instagram_id: Number(instaUser.id)
		}).select('-notes').then(user => {

			if (user) {

				return user;
			}

			return UserModel.create({
				instagram_id: Number(instaUser.id),
				username: instaUser.username,
				full_name: instaUser.full_name,
				profile_pic_url: instaUser.profile_picture
			});
		});
	}

	updateAverage(this: IUser) {

		return UserModel.getAverage(this._id).then(average => {

			this.set('rate', average.avg);
			this.set('count', average.count);

			return this.save();
		});
	}
}

UserSchema.loadClass(User);

export const UserModel = model<IUser, IUserModel>('User', UserSchema);

// db.users.find({},{username:1, rate:1, count:1}).sort({rate:-1, count: 1}).pretty()