import {Expose, plainToClass} from "class-transformer";
import {ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber} from "class-validator";

export class ProjectsDto {

  @Expose({name: 'projects_ids'})
  @IsNotEmpty({ message: 'Project ids are required' })
  @IsArray({ message: 'Project ids must be an array' })
  @ArrayNotEmpty({ message: 'Project ids array must not be empty' })
  @ArrayMinSize(1, { message: 'Project ids array must contain at least one project id' })
  @IsNumber({}, { each: true, message: 'Each project id must be a number' })
    projectsIds!: number[];

  constructor(data: Partial<ProjectsDto>) {
    Object.assign(this, plainToClass(ProjectsDto, data));
  }
}