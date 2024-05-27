import {IsNotEmpty, IsNumber} from "class-validator";
import {Expose, plainToClass} from "class-transformer";

export class TaskQueryDto {

  @Expose({name: 'project_id'})
  @IsNotEmpty({ message: 'Project id is required' })
  @IsNumber({}, { message: 'Project ID must be a number' })
    projectId!: number;

  skip: number | undefined;
  limit: number | undefined;

  constructor(data: Partial<TaskQueryDto>) {
    Object.assign(this, plainToClass(TaskQueryDto, data));
  }
}