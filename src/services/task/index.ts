import Task, {ITask} from "src/model/task";
import {TaskDto} from "src/dto/task/taskDto";
import {TaskSaveDto} from "src/dto/task/taskSaveDto";
import {TaskQueryDto} from "src/dto/task/taskQueryDto";
import axios from "axios";
import {Error} from "mongoose";
import {ProjectsDto} from "src/dto/project/projectsDto";
import {instanceToPlain} from 'class-transformer';
import {MembersIdsDto} from "src/dto/member/membersIdsDto";

export const saveTask = async (
  taskSaveDto: TaskSaveDto
): Promise<string> => {
  const task = new Task(taskSaveDto);
  await task.save();
  return task._id;
};

export const listTasksByProjectId = async (
  query: TaskQueryDto,
): Promise<Record<string, any>[]> => {
  const { projectId, skip, limit } = query;
  const tasks = await Task.find({
    projectId,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const taskDtos = tasks.map(task => toTaskDto(task));
  return taskDtos.map(task => instanceToPlain(new TaskDto(task)));
};

const toTaskDto = (task: ITask): TaskDto => {
  return ({
    _id: task._id.toString(),
    name: task.name,
    description: task.description,
    projectId: task.projectId,
    reporterId: task.reporterId,
    assigneeId: task.assigneeId,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  });
};

export const counts = async (projectsDto: ProjectsDto) => {
  const results = await Task.aggregate([
    { $match: { projectId: { $in: projectsDto.projectsIds } } },
    { $group: { _id: '$projectId', count: { $sum: 1 } } },
  ]);

  const resultMap: Record<string, number> = {};
  for (const obj of results) {
    resultMap[obj._id] = obj.count;
  }

  for (const projectId of projectsDto.projectsIds) {
    if (!(projectId in resultMap)) {
      resultMap[projectId] = 0;
    }
  }

  return resultMap;
};

export const validateTask = async (taskSaveDto: TaskSaveDto) => {
  try {
    const response = await axios.get(`http://backend:8080/api/projects/${taskSaveDto.projectId}/members`);

    const membersIdsDto: MembersIdsDto = new MembersIdsDto(response.data as object);
    const membersIdsSet: Set<number> = new Set(membersIdsDto.membersIds);

    const assigneeIdExists: boolean = taskSaveDto.assigneeId !== undefined ? membersIdsSet.has(taskSaveDto.assigneeId) : true;
    const reporterIdExists: boolean = membersIdsSet.has(taskSaveDto.reporterId);

    return assigneeIdExists && reporterIdExists;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Validation error: ${error.response.data.message}`);
    }

    throw new Error('Validation error: ' + error.message);
  }
};


