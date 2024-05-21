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
    assigneeId?: number;

  @Expose({name: 'reporter_id'})
    reporterId!: number;

  @Expose({name: 'created_at'})
    createdAt!: Date;

  @Expose({name: 'updated_at'})
    updatedAt!: Date;

  // constructor(
  //   id: string,
  //   name: string,
  //   description: string,
  //   projectId: number,
  //   assigneeId: number,
  //   reporterId: number,
  //   createdAt: Date,
  //   updatedAt: Date,
  // ) {
  //   this._id = id;
  //   this.name = name;
  //   this.description = description;
  //   this.projectId = projectId;
  //   this.assigneeId = assigneeId;
  //   this.reporterId = reporterId;
  //   this.createdAt = createdAt;
  //   this.updatedAt = updatedAt;
  // }

  constructor(partial: Partial<TaskDto> = {}) {
    Object.assign(this, partial);
  }

}