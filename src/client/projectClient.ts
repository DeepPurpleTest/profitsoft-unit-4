import axios from "axios";
import {ClientError} from "../handler/errors/clientError";
import dotenv from "dotenv";
import {NotFoundError} from "../handler/errors/notFoundError";

dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;

export const getMembers = async (projectId: number) => {
  try {
    return await axios.get(`${API_BASE_URL}/api/projects/${projectId}/members`);
  } catch (error: any) {
    if (error.response.data.status === 'NOT_FOUND') {
      throw new NotFoundError(error.response.data.message);
    }

    throw new ClientError(error.response.data.message);
  }
};