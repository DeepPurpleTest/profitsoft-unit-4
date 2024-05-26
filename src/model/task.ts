import mongoose, {Document, Schema} from 'mongoose';

export interface ITask extends Document {
  name: string;
  description: string;
  projectId: number;
  assigneeId: number | null;
  reporterId: number;

  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  projectId: {
    required: true,
    type: Number,
  },

  assigneeId: {
    type: Number,
    default: null,
  },

  reporterId: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
},);

const Task = mongoose.model<ITask>('Task', taskSchema);

export {taskSchema};
export default Task;
