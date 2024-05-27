import Task from "src/model/task";
import {TaskDto} from "src/dto/task/taskDto";
import {TaskSaveDto} from "src/dto/task/taskSaveDto";
import {TaskQueryDto} from "src/dto/task/taskQueryDto";
import {ProjectsDto} from "src/dto/project/projectsDto";
import {instanceToPlain} from 'class-transformer';
import {MembersIdsDto} from "src/dto/member/membersIdsDto";
import {getMembers} from "../../client/projectClient";
import {validate} from "class-validator";
import {ValidationError} from "../../handler/errors/validationError";
import {NotFoundError} from "../../handler/errors/notFoundError";

export const SKIP_DEFAULT = 0;
export const LIMIT_DEFAULT = 5;

export const saveTask = async (
  taskSaveDto: TaskSaveDto
): Promise<string> => {
  const task = new Task(taskSaveDto);
  await task.save();
  return task._id;
};

export const listTasksByProjectId = async (
  taskQueryDto: TaskQueryDto,
): Promise<Record<string, any>[]> => {
  await validateFields(taskQueryDto);

  const { projectId, skip, limit } = taskQueryDto;
  const tasks = await Task.find({
    projectId,
  })
    .sort({ createdAt: -1 })
    .skip(skip ?? SKIP_DEFAULT)
    .limit(limit ?? LIMIT_DEFAULT)
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

export const validateTask = async (taskSaveDto: TaskSaveDto) => {
  await validateFields(taskSaveDto);

  const response = await getMembers(taskSaveDto.projectId);

  const membersIdsDto: MembersIdsDto = new MembersIdsDto(response.data as object);
  const membersIdsSet: Set<number> = new Set(membersIdsDto.membersIds);

  if (taskSaveDto.assigneeId !== undefined && !membersIdsSet.has(taskSaveDto.assigneeId)) {
    throw new NotFoundError(`Invalid assigneeId: ${taskSaveDto.assigneeId}`);
  }

  if (!membersIdsSet.has(taskSaveDto.reporterId)) {
    throw new NotFoundError(`Invalid reporterId: ${taskSaveDto.reporterId}`);
  }
};

const validateFields = async (object: any) => {
  const errors = await validate(object);
  if (errors.length > 0) {
    const validationErrors = errors.map(error => ({
      field: error.property,
      errors: Object.values(error.constraints ?? {}),
    }));
    throw new ValidationError(validationErrors);
  }
};


