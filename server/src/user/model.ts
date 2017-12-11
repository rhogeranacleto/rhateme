import { Document, Schema, model } from 'mongoose';

export interface INotes extends Document {
	value: number;
}

export interface IUser extends Document {
	name: string;
	rate: number;
	notes: INotes[];
}

export const NoteSchema = new Schema({
	value: {
		type: Number,
		required: true
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
	name: {
		type: String,
		required: true
	},
	rate: {
		type: Number,
		default: 0
	},
	notes: [NoteSchema]
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