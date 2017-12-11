import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
	name: string;
	rate: number;
}

export const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	rate: {
		type: Number,
		default: 0
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

export const UserModel = model<IUser>('User', UserSchema);