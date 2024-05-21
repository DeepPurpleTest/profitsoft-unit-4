import mongoose, {Document, Schema} from 'mongoose';

export interface ITask extends Document {
  name: string;
  description: string;
  projectId: number;
  assigneeId: number;
  reporterId: number;

  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  description: {
    required: true,
    type: String,
  },

  projectId: {
    type: Number,
    required: true,
  },

  assigneeId: {
    type: Number,
    required: false,
  },

  reporterId: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
  timezone: 'UTC',
},);

const Task = mongoose.model<ITask>('Task', taskSchema);

export {taskSchema};
export default Task;
