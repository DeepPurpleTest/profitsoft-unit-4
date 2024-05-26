import axios from "axios";
import {ClientError} from "../handler/errors/clientError";

export const getMembers = async (projectId: number) => {
  try {
    return await axios.get(`http://localhost:8080/api/projects/${projectId}/members`);
  } catch (error: any) {
    throw new ClientError(error);
  }
};