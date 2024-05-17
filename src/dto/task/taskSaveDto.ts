export class TaskSaveDto {
  name?: string;
  description?: string;
  projectId?: string;
  assigneeId?: string;
  reporterId?: string;

  constructor(data: Partial<TaskSaveDto>) {
    this.name = data.name;
    this.description = data.description;
    this.projectId = data.projectId;
    this.assigneeId = data.assigneeId;
    this.reporterId = data.reporterId;
  }
}