export class ProjectsDto {
  projectsIds: number[];

  constructor(projectsIds: number[]) {
    this.projectsIds = projectsIds;
  }
}