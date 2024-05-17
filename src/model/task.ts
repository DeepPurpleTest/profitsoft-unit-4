import mongoose, {Document, Schema} from 'mongoose';

export interface ITask extends Document {
  name: string;
  description: string;
  projectId: string;
  assigneeId: string;
  reporterId: string;

  createdAt: Date;
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
    type: String,
    required: true,
  },

  assigneeId: {
    type: String,
    required: false,
  },

  reporterId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  timezone: 'UTC',
},);

const Task = mongoose.model<ITask>('Task', taskSchema);

export {taskSchema};
export default Task;
