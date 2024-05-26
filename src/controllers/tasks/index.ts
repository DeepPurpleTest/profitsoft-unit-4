import httpStatus from 'http-status';
import {Request, Response} from 'express';
import {
  counts as countsTaskApi,
  listTasksByProjectId as listTasksApi,
  saveTask as createTaskApi,
  validateTask,
} from 'src/services/task';
import {TaskSaveDto} from "src/dto/task/taskSaveDto";
import {TaskQueryDto} from "src/dto/task/taskQueryDto";
import {ProjectsDto} from "../../dto/project/projectsDto";
import {errorHandler} from "../../handler/handler";


export const listTasksByProjectId = async (req: Request, res: Response): Promise<void> => {
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
    errorHandler(err, req, res);
  }
};

export const saveTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskDto = new TaskSaveDto(req.body);
    const isValid = await validateTask(taskDto);

    if(!isValid) {
      res.status(httpStatus.BAD_REQUEST).send({ message: 'Incorrect task data'});
      return;
    }

    const id = await createTaskApi({
      ...taskDto,
    });

    res.status(httpStatus.CREATED).send({
      id,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

export const countsTasks = async (req: Request, res: Response): Promise<void> => {
  const projectsDto = new ProjectsDto(req.body);

  try {
    const result = await countsTaskApi(projectsDto);
    res.send(result);
  } catch (err) {
    errorHandler(err, req, res);
  }
};
