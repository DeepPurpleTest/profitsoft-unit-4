export class ProjectSaveDto {
  name: string | undefined;
  description: string | undefined;

  constructor(data: Partial<ProjectSaveDto>) {
    this.name = data.name;
    this.description = data.description;
  }
}