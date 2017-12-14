import { Document, Schema, model, Model, Types } from 'mongoose';

export interface INotes {
	value: number;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	readonly _id?: String;
}

export interface IUser extends Document {
	username: string;
	full_name: string;
	profile_pic_url: string;
	followed_by: number;
	rate: number;
	notes: INotes[];
	count: number;
	readonly created_at: Date;
	readonly updated_at: Date;
	updateAverage(): Promise<this>;
}

export const NoteSchema = new Schema({
	value: {
		type: Number,
		required: true,
	}
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
	followed_by: Number,
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

interface IUserModel extends Model<IUser> {
	getAverage(userId: string): Promise<IAverage>;
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
			avg: {
				$avg: '$notes.value'
			},
			count: { $sum: 1 }
		}).limit(1).then(obj => {

			return (<IAverage>obj[0]);
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