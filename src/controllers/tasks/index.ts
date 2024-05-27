import httpStatus from 'http-status';
import {NextFunction, Request, Response} from 'express';
import {
  counts as countsTaskApi,
  listTasksByProjectId as listTasksApi,
  saveTask as createTaskApi,
  validateTask,
} from 'src/services/task';
import {TaskSaveDto} from "src/dto/task/taskSaveDto";
import {TaskQueryDto} from "src/dto/task/taskQueryDto";
import {ProjectsDto} from "../../dto/project/projectsDto";


export const listTasksByProjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {size, from} = req.query;
    const taskQueryDto = new TaskQueryDto(
      req.body,
      size ? parseInt(size as string, 10) : 5,
      from ? parseInt(from as string, 10) : 0,
    );

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
