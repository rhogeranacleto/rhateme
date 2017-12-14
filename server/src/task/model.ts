import { Document, Schema, model, Model } from 'mongoose';
import { UserModel, IUser } from '../user/model';

export enum TaskStatus {
	todo = 'todo',
	working = 'working',
	done = 'done'
}

export interface ITask extends Document {
	user_id: string;
	status: TaskStatus;
	readonly created_at: Date;
	readonly updated_at: Date;
}

export const TaskSchema = new Schema({
	user_id: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: Object.keys(TaskStatus),
		required: true,
		default: TaskStatus.todo
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

interface ITodoModel extends Model<ITask> {
	getNextUserToProcess(): Promise<IUser | undefined>;
	checkExistsTaskOfuser(userId: string): Promise<boolean>;
}

TaskSchema.static('getNextUserToProcess', function (this: ITodoModel): Promise<IUser | undefined> {

	return this.findOneAndUpdate({
		status: TaskStatus.todo
	}, {
			$set: {
				status: TaskStatus.working
			}
		}, {
			sort: {
				created_at: 1
			},
			new: true
		}).then(task => {

			if (task) {

				return <PromiseLike<IUser>>UserModel.findById(task.user_id);
			}
		});
});

TaskSchema.static('checkExistsTaskOfuser', function (this: ITodoModel, userId: string): Promise<boolean> {

	return this.count({
		staus: TaskStatus.todo,
		userId
	}).then(amount => {

		return amount > 0;
	});
});

export const TodoModel = model<ITask, ITodoModel>('Todo', TaskSchema);
export const DoneModel = model<ITask>('Done', TaskSchema);