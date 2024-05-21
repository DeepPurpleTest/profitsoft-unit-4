import log4js from 'log4js';
import httpStatus from 'http-status';
import {Request, Response} from 'express';
import {
  counts as countsTaskApi,
  listTasksByProjectId as listTasksApi,
  saveTask as createTaskApi,
  validateTask,
} from 'src/services/task';
import {InternalError} from 'src/system/internalError';
import {TaskSaveDto} from "src/dto/task/taskSaveDto";
import {TaskQueryDto} from "src/dto/task/taskQueryDto";

export const listTasksByProjectId = async (req: Request, res: Response) => {
  const {projectId, size, from} = req.query;

  const query: TaskQueryDto = {
    projectId: parseInt(projectId as string, 10) || 0,
    skip: parseInt(from as string, 10) || 0,
    limit: parseInt(size as string, 10) || 10,
  };

  try {
    const result = await listTasksApi(query);
    res.send(result);
  } catch (err) {
    const {message, status} = new InternalError(err);
    log4js.getLogger().error('Error in retrieving tasks.', err);
    res.status(status).send({message});
  }
};

export const saveTask = async (req: Request, res: Response) => {
  try {
    const taskDto = new TaskSaveDto(req.body);
    const isValid = await validateTask(taskDto);

    if(!isValid) {
      res.status(httpStatus.BAD_REQUEST).send('Incorrect task data');
      return;
    }

    const id = await createTaskApi({
      ...taskDto,
    });

    res.status(httpStatus.CREATED).send({
      id,
    });
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Validation error')) {
      log4js.getLogger().error('Error in creating task.', err.message);
      res.status(httpStatus.BAD_REQUEST).send({message: err.message});
    } else {
      const {message, status} = new InternalError(err);
      log4js.getLogger().error('Error in creating task.', err);
      res.status(status).send({message});
    }
  }
};

export const countsTasks = async (req: Request, res: Response) => {
  const projectsDto = req.body;

  try {
    const result = await countsTaskApi(projectsDto);
    res.send(result);
  } catch (err) {
    const {message, status} = new InternalError(err);
    log4js.getLogger().error('Error in retrieving tasks.', err);
    res.status(status).send({message});
  }
};
