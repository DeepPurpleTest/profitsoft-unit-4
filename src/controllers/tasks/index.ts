import httpStatus from 'http-status';
import {NextFunction, Request, Response} from 'express';
import {
  counts as countsTaskApi,
  listTasksByProjectId as listTasksApi,
  saveTask as createTaskApi,
  validateTask,
} from 'src/services/task';
import {TaskSaveDto} from "src/dto/task/taskSaveDto";
import {ProjectsDto} from "../../dto/project/projectsDto";
import {TaskQueryDto} from "../../dto/task/taskQueryDto";


export const listTasksByProjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {size, from} = req.query;

    const data = {
      ...req.body,
      skip: from,
      limit: size,
    };

    const taskQueryDto = new TaskQueryDto(data);

    const result = await listTasksApi(taskQueryDto);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const saveTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskDto = new TaskSaveDto(req.body);
    await validateTask(taskDto);

    const id = await createTaskApi({
      ...taskDto,
    });

    res.status(httpStatus.CREATED).send({
      id,
    });
  } catch (err) {
    next(err);
  }
};

export const countsTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const projectsDto = new ProjectsDto(req.body);

  try {
    const result = await countsTaskApi(projectsDto);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
