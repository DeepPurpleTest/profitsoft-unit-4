import Task, {ITask} from "../../model/task";
import {TaskDto} from "../../dto/task/taskDto";
import {TaskSaveDto} from "../../dto/task/taskSaveDto";
import {TaskQueryDto} from "../../dto/task/taskQueryDto";

export const saveTask = async (
  taskDto: TaskSaveDto
): Promise<string> => {
  // await validateTask(taskDto);
  const task = await new Task(taskDto).save();
  return task._id;
};

const toDto = (task: ITask): TaskDto => {
  return ({
    _id: task._id,
    name: task.name,
    description: task.description,
    cratedAt: task.createdAt,
    projectId: task.projectId,
    assigneeId: task.assigneeId,
    reporterId: task.reporterId,
  });
};

export const listTasksByProjectId = async (
  query: TaskQueryDto,
): Promise<TaskDto[]> => {
  const { projectId, skip, limit } = query;

  console.log(projectId);
  console.log(skip);
  console.log(limit);

  const tasks = await Task.find({
    projectId,
  })
    .skip(skip)
    .limit(limit);

  console.log(tasks);
  return tasks.map(task => toDto(task));
};

// export const validateTask = async (taskDto: TaskSaveDto) => {
// };


