import axios from "axios";
import {ClientError} from "../handler/errors/clientError";
import dotenv from "dotenv";

dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;

export const getMembers = async (projectId: number) => {
  try {
    return await axios.get(`${API_BASE_URL}api/projects/${projectId}/members`);
  } catch (error: any) {
    throw new ClientError(error);
  }
};