export interface TaskDto {
  _id: string,
  name: string,
  description: string,
  cratedAt: Date,
  projectId: string,
  assigneeId: string,
  reporterId: string,
}