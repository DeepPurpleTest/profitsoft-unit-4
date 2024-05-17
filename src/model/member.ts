import mongoose, {Document, Schema} from 'mongoose';
import {IProject} from "./project";
import {ITask} from "./task";

export interface IMember extends Document {
  name: string;
  email: string;
  projects?: IProject[];
  createdTasks?: ITask[];
  assignedTasks?: ITask[];
}

const memberSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  email: {
    required: true,
    type: String,
  },

  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],

  createdTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],

  assignedTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

const Member = mongoose.model<IMember>('Member', memberSchema);

export {memberSchema};
export default Member;
