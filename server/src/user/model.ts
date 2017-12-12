import { Document, Schema, model } from 'mongoose';

export interface INotes extends Document {
	value: number;
}

export interface IUser extends Document {
	username: string;
	full_name: string;
	profile_pic_url: string;
	followed_by: number;
	rate: number;
	notes: INotes[];
}

export const NoteSchema = new Schema({
	value: {
		type: Number,
		required: true,
	}
}, {
		timestamps: true,
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

export const UserModel = model<IUser>('User', UserSchema);