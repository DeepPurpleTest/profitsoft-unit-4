import {Expose} from "class-transformer";

export class TaskDto {
  @Expose({ name: '_id' })
    _id!: string;

  @Expose()
    name!: string;

  @Expose()
    description!: string;

  @Expose({name: 'project_id'})
    projectId!: number;

  @Expose({name: 'assignee_id'})
    assigneeId?: number | null;

  @Expose({name: 'reporter_id'})
    reporterId!: number;

  @Expose({name: 'created_at'})
    createdAt!: Date;

  @Expose({name: 'updated_at'})
    updatedAt!: Date;

  constructor(partial: Partial<TaskDto> = {}) {
    Object.assign(this, partial);
  }
}