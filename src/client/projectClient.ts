import axios from "axios";

export const getMembers = async (projectId: number) => {
  return await axios.get(`http://localhost:8080/api/projects/${projectId}/members`);
}