import log4js from 'log4js';
import httpStatus from 'http-status';
import {Request, Response} from 'express';
import {listTasksByProjectId as listTasksApi, saveTask as createTaskApi} from 'src/services/task';
import {InternalError} from 'src/system/internalError';
import {TaskSaveDto} from "../../dto/task/taskSaveDto";
import {TaskQueryDto} from "../../dto/task/taskQueryDto";

export const listTasksByProjectId = async (req: Request, res: Response) => {
  // const { projectId } = _.params; // for /id
  const { projectId, size, from } = req.query;

  // const response = await axios.get('http://localhost:8080/api/projects/1');
  const query: TaskQueryDto = {
    projectId: parseInt(projectId as string, 10) || 0,
    skip: parseInt(from as string, 10) || 0,
    limit: parseInt(size as string, 10) || 10,
  };

  try {
    const result = await listTasksApi(query);
    res.send(result);
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error('Error in retrieving tasks.', err);
    res.status(status).send({ message });
  }
};

export const saveTask = async (req: Request, res: Response) => {
  try {
    const task = new TaskSaveDto(req.body);
    const id = await createTaskApi({
      ...task,
    });
    res.status(httpStatus.CREATED).send({
      id,
    });
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error('Error in creating student.', err);
    res.status(status).send({ message });
  }
};
