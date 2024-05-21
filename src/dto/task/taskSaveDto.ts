import {Expose, plainToClass} from "class-transformer";

export class TaskSaveDto {
  name!: string;
  description!: string;

  @Expose({name: 'project_id'})
    projectId!: number;

  @Expose({name: 'assignee_id'})
    assigneeId?: number;

  @Expose({name: 'reporter_id'})
    reporterId!: number;

  constructor(data: Partial<TaskSaveDto>) {
    Object.assign(this, plainToClass(TaskSaveDto, data));
  }
}