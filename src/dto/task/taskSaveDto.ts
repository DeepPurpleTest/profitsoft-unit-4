import {Expose, plainToClass} from "class-transformer";
import {IsNotEmpty, IsNumber, IsOptional} from "class-validator";

export class TaskSaveDto {
  @IsNotEmpty({ message: 'Name is required' })
    name!: string;

  @IsNotEmpty({ message: 'Description is required' })
    description!: string;

  @Expose({name: 'project_id'})
  @IsNotEmpty({ message: 'Project id is required' })
  @IsNumber({}, { message: 'Project ID must be a number' })
    projectId!: number;

  @Expose({name: 'assignee_id'})
  @IsOptional()
  @IsNumber({}, { message: 'Assignee ID must be a number' })
    assigneeId?: number;

  @IsNotEmpty({ message: 'Reporter id is required' })
  @IsNumber({}, { message: 'Reporter ID must be a number' })
  @Expose({name: 'reporter_id'})
    reporterId!: number;

  constructor(data: Partial<TaskSaveDto>) {
    Object.assign(this, plainToClass(TaskSaveDto, data));
  }
}