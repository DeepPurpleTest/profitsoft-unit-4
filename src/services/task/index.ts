import Task from "src/model/task";
import {TaskDto} from "src/dto/task/taskDto";
import {TaskSaveDto} from "src/dto/task/taskSaveDto";
import {TaskQueryDto} from "src/dto/task/taskQueryDto";
import {Error} from "mongoose";
import {ProjectsDto} from "src/dto/project/projectsDto";
import {instanceToPlain} from 'class-transformer';
import {MembersIdsDto} from "src/dto/member/membersIdsDto";
import {getMembers} from "../../client/projectClient";

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
    .limit(limit)
    .select('-__v')
    .lean();

  return tasks.map(task => {
    const transformedTask = { ...task, _id: task._id.toString() };
    return instanceToPlain(new TaskDto(transformedTask));
  });
};

export const counts = async (projectsDto: ProjectsDto): Promise<Record<string, number>> => {
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

export const validateTask = async (taskSaveDto: TaskSaveDto): Promise<boolean> => {
  try {
    const response = await getMembers(taskSaveDto.projectId);

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


