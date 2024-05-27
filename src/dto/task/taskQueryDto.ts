import {QueryDto} from "../queryDto";
import {IsNotEmpty, IsNumber} from "class-validator";
import {Expose, plainToClass} from "class-transformer";

export class TaskQueryDto extends QueryDto {

  @Expose({name: 'project_id'})
  @IsNotEmpty({ message: 'Project id is required' })
  @IsNumber({}, { message: 'Project ID must be a number' })
    projectId!: number;

  constructor(data: Partial<TaskQueryDto>, skip: number, limit: number) {
    super(skip, limit);
    Object.assign(this, plainToClass(TaskQueryDto, data));
  }
}