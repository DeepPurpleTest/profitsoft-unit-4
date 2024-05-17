import mongoose, {Document, Schema} from 'mongoose';
import {ITask} from "./task";
import {IMember} from "./member";

export interface IProject extends Document {
  name: string;
  description: string;
  tasks?: ITask[];
  members?: IMember[];
}

const projectSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  description: {
    required: true,
    type: String,
  },

  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],
});

const Project = mongoose.model<IProject>('Project', projectSchema);

export { projectSchema };
export default Project;
