import log4js from 'log4js';
import httpStatus from 'http-status';
import {Request, Response} from 'express';
import {listProjects as listProjectApi, saveProject as saveProjectApi,} from 'src/services/project';
import {InternalError} from 'src/system/internalError';
import {ProjectSaveDto} from "../../dto/project/projectSaveDto";
import axios from 'axios';

export const listProjects = async (_: Request, res: Response) => {
  try {
    const result = await listProjectApi();
    res.send(result);
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error('Error in retrieving projects.', err);
    res.status(status).send({ message });
  }
};

export const findById = async (_: Request, res: Response) => {
  try {
    const response = await axios.get('http://localhost:8080/api/projects/1');
    console.log(response.data);
    res.send(response.data);
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error('Error in retrieving project by id.', err);
    res.status(status).send({ message });
  }
};

export const saveProject = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
    } = new ProjectSaveDto(req.body);
    const id = await saveProjectApi({
      name,
      description,
    });
    res.status(httpStatus.CREATED).send({
      id,
    });
  } catch (err) {
    const { message, status } = new InternalError(err);
    log4js.getLogger().error('Error in creating project.', err);
    res.status(status).send({ message });
  }
};
