import {Expose, plainToClass} from "class-transformer";

export class ProjectsDto {
  @Expose({name: 'projects_ids'})
    projectsIds!: number[];

  constructor(data: Partial<ProjectsDto>) {
    Object.assign(this, plainToClass(ProjectsDto, data));
  }
}